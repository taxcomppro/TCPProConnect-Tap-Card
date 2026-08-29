import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { proConnectCardAssignments, proConnectCards, proConnectConnections } from "@/db/schema";
import { hashCardToken, isValidCardToken } from "@/lib/card-token";

type ConnectionRouteProps = { params: Promise<{ cardToken: string }> };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request, { params }: ConnectionRouteProps) {
  const { cardToken } = await params;
  if (!isValidCardToken(cardToken) && cardToken !== "demo-jordan-williams") {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });
  if (clean(body.companyWebsite, 200)) return Response.json({ ok: true }, { status: 202 });

  const name = clean(body.name, 100);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const note = clean(body.note, 500);
  if (!name || (!email && !phone) || body.consent !== "yes") {
    return Response.json({ error: "Name, consent, and an email or phone number are required" }, { status: 422 });
  }

  // Demo submissions are acknowledged but never persisted.
  if (cardToken === "demo-jordan-williams") return Response.json({ ok: true, demo: true }, { status: 201 });

  const db = getDb();
  const tokenHash = await hashCardToken(cardToken);
  const [assignment] = await db
    .select({ cardId: proConnectCards.id, profileId: proConnectCardAssignments.profileId })
    .from(proConnectCards)
    .innerJoin(proConnectCardAssignments, and(eq(proConnectCardAssignments.cardId, proConnectCards.id), eq(proConnectCardAssignments.status, "ACTIVE")))
    .where(and(eq(proConnectCards.tokenHash, tokenHash), eq(proConnectCards.status, "ACTIVE")))
    .limit(1);
  if (!assignment) return Response.json({ error: "Card not found" }, { status: 404 });

  const now = new Date().toISOString();
  await db.insert(proConnectConnections).values({
    id: crypto.randomUUID(),
    cardId: assignment.cardId,
    profileId: assignment.profileId,
    name,
    email,
    phone,
    note,
    consentedAt: now,
    createdAt: now,
  });
  return Response.json({ ok: true }, { status: 201 });
}
