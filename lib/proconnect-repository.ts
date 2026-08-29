import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { proConnectCardAssignments, proConnectCards, proConnectLinks, proConnectProfiles } from "@/db/schema";
import { hashCardToken, isValidCardToken } from "./card-token";
import type { ProConnectProfile } from "./proconnect-profile";

export async function findPublicProfileByCardToken(cardToken: string): Promise<ProConnectProfile | null> {
  if (!isValidCardToken(cardToken)) return null;
  const tokenHash = await hashCardToken(cardToken);

  try {
    const db = getDb();
    const [record] = await db
      .select({
        cardTokenHash: proConnectCards.tokenHash,
        fullName: proConnectProfiles.fullName,
        initials: proConnectProfiles.initials,
        title: proConnectProfiles.title,
        company: proConnectProfiles.company,
        location: proConnectProfiles.location,
        bio: proConnectProfiles.bio,
        phone: proConnectProfiles.phone,
        email: proConnectProfiles.email,
        website: proConnectProfiles.website,
        bookingUrl: proConnectProfiles.bookingUrl,
        marketplaceUrl: proConnectProfiles.marketplaceUrl,
        verified: proConnectProfiles.verified,
        specialtiesJson: proConnectProfiles.specialtiesJson,
        profileId: proConnectProfiles.id,
      })
      .from(proConnectCards)
      .innerJoin(proConnectCardAssignments, and(eq(proConnectCardAssignments.cardId, proConnectCards.id), eq(proConnectCardAssignments.status, "ACTIVE")))
      .innerJoin(proConnectProfiles, and(eq(proConnectProfiles.id, proConnectCardAssignments.profileId), eq(proConnectProfiles.published, true)))
      .where(and(eq(proConnectCards.tokenHash, tokenHash), eq(proConnectCards.status, "ACTIVE")))
      .limit(1);

    if (!record) return null;
    const links = await db
      .select({ label: proConnectLinks.label, description: proConnectLinks.description, url: proConnectLinks.url })
      .from(proConnectLinks)
      .where(and(eq(proConnectLinks.profileId, record.profileId), eq(proConnectLinks.active, true), eq(proConnectLinks.visibility, "PUBLIC")))
      .orderBy(asc(proConnectLinks.sortOrder));

    let specialties: string[] = [];
    try {
      const parsed = JSON.parse(record.specialtiesJson);
      specialties = Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
    } catch {}

    const safeUrl = (value: string) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : "";
      } catch {
        return "";
      }
    };

    return {
      cardToken,
      fullName: record.fullName,
      initials: record.initials,
      title: record.title,
      company: record.company,
      location: record.location,
      bio: record.bio,
      phone: record.phone.replace(/[^+0-9]/g, "").slice(0, 20),
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email) ? record.email : "",
      website: safeUrl(record.website),
      bookingUrl: safeUrl(record.bookingUrl),
      marketplaceUrl: safeUrl(record.marketplaceUrl),
      verified: record.verified,
      specialties,
      links: links.map((link) => ({ ...link, url: safeUrl(link.url) })).filter((link) => link.url),
    };
  } catch (error) {
    console.error("Unable to resolve ProConnect card", error);
    return null;
  }
}
