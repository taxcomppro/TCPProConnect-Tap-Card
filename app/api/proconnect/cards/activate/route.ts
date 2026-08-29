import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { proConnectCardAssignments, proConnectCards, proConnectProfiles } from "@/db/schema";
import { hashCardToken, isValidCardToken } from "@/lib/card-token";

type ActivationRequest = {
  cardToken?: unknown;
  signupSessionId?: unknown;
  taxCompProUserId?: unknown;
  membershipId?: unknown;
  issuedByStaffId?: unknown;
};

type MembershipResult = {
  active: boolean;
  taxCompProUserId: string;
  membershipId: string;
  plan: string;
  status: string;
};

const runtimeEnv = env as unknown as Record<string, string | D1Database | undefined>;

function requiredString(value: unknown, max = 160) {
  const cleaned = typeof value === "string" ? value.trim() : "";
  return cleaned && cleaned.length <= max ? cleaned : null;
}

async function sameSecret(provided: string, expected: string) {
  const encoder = new TextEncoder();
  const [left, right] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const a = new Uint8Array(left);
  const b = new Uint8Array(right);
  let difference = a.length ^ b.length;
  for (let index = 0; index < Math.min(a.length, b.length); index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
}

async function verifyMembership(input: { taxCompProUserId: string; membershipId: string }): Promise<MembershipResult | null> {
  const endpoint = runtimeEnv.TAXCOMPPRO_MEMBERSHIP_VERIFY_URL;
  const token = runtimeEnv.TAXCOMPPRO_INTEGRATION_TOKEN;
  if (typeof endpoint !== "string" || typeof token !== "string") return null;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) return null;
  const result = await response.json() as MembershipResult;
  return result.active && result.status === "ACTIVE" ? result : null;
}

export async function POST(request: Request) {
  const expectedSecret = runtimeEnv.PROCONNECT_ACTIVATION_SECRET;
  const providedSecret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (typeof expectedSecret !== "string" || !providedSecret || !(await sameSecret(providedSecret, expectedSecret))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as ActivationRequest | null;
  const cardToken = requiredString(body?.cardToken, 128);
  const signupSessionId = requiredString(body?.signupSessionId);
  const taxCompProUserId = requiredString(body?.taxCompProUserId);
  const membershipId = requiredString(body?.membershipId);
  const issuedByStaffId = requiredString(body?.issuedByStaffId);
  if (!cardToken || !isValidCardToken(cardToken) || !signupSessionId || !taxCompProUserId || !membershipId || !issuedByStaffId) {
    return Response.json({ error: "Invalid activation request" }, { status: 400 });
  }

  const membership = await verifyMembership({ taxCompProUserId, membershipId });
  if (!membership || membership.taxCompProUserId !== taxCompProUserId || membership.membershipId !== membershipId) {
    return Response.json({ error: "Active membership could not be verified" }, { status: 409 });
  }

  const db = getDb();
  const tokenHash = await hashCardToken(cardToken);
  const [[card], [profile], [existingCard], [existingSession]] = await Promise.all([
    db.select({ id: proConnectCards.id, status: proConnectCards.status }).from(proConnectCards).where(eq(proConnectCards.tokenHash, tokenHash)).limit(1),
    db.select({ id: proConnectProfiles.id }).from(proConnectProfiles).where(eq(proConnectProfiles.taxCompProUserId, taxCompProUserId)).limit(1),
    db.select({ id: proConnectCardAssignments.id, signupSessionId: proConnectCardAssignments.signupSessionId, cardId: proConnectCardAssignments.cardId })
      .from(proConnectCardAssignments)
      .innerJoin(proConnectCards, eq(proConnectCards.id, proConnectCardAssignments.cardId))
      .where(and(eq(proConnectCards.tokenHash, tokenHash), eq(proConnectCardAssignments.status, "ACTIVE"))).limit(1),
    db.select({ id: proConnectCardAssignments.id, cardId: proConnectCardAssignments.cardId })
      .from(proConnectCardAssignments)
      .where(and(eq(proConnectCardAssignments.signupSessionId, signupSessionId), eq(proConnectCardAssignments.status, "ACTIVE"))).limit(1),
  ]);

  if (!card) return Response.json({ error: "Unknown card" }, { status: 404 });
  if (!profile) return Response.json({ error: "Member profile must be created before activation" }, { status: 409 });
  if (existingCard?.signupSessionId === signupSessionId) {
    return Response.json({ cardId: card.id, status: "ACTIVE", profileUrl: `/connect/${cardToken}`, idempotent: true });
  }
  if (existingSession) return Response.json({ error: "This signup session already has an active card" }, { status: 409 });
  if (card.status !== "AVAILABLE" || existingCard) return Response.json({ error: "Card is already assigned or unavailable" }, { status: 409 });

  const now = new Date().toISOString();
  const assignmentId = crypto.randomUUID();
  await db.batch([
    db.update(proConnectCards).set({ status: "ACTIVE", activatedAt: now }).where(and(eq(proConnectCards.id, card.id), eq(proConnectCards.status, "AVAILABLE"))),
    db.insert(proConnectCardAssignments).values({
      id: assignmentId,
      cardId: card.id,
      profileId: profile.id,
      signupSessionId,
      membershipId,
      membershipPlan: membership.plan,
      issuedByStaffId,
      status: "ACTIVE",
      assignedAt: now,
    }),
  ]);

  return Response.json({ cardId: card.id, assignmentId, status: "ACTIVE", profileUrl: `/connect/${cardToken}`, activatedAt: now }, { status: 201 });
}
