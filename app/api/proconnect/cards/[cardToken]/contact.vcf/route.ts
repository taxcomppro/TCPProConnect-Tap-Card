import { NextResponse } from "next/server";
import { getPublicProfile } from "@/lib/proconnect-profile";

type ContactRouteProps = { params: Promise<{ cardToken: string }> };

function vcardEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export async function GET(_request: Request, { params }: ContactRouteProps) {
  const { cardToken } = await params;
  const profile = await getPublicProfile(cardToken);
  if (!profile) return NextResponse.json({ error: "Card not found" }, { status: 404 });

  const parts = profile.fullName.trim().split(/\s+/);
  const lastName = parts.pop() ?? "";
  const firstName = parts.join(" ");
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${vcardEscape(lastName)};${vcardEscape(firstName)};;;`,
    `FN:${vcardEscape(profile.fullName)}`,
    `ORG:${vcardEscape(profile.company)}`,
    `TITLE:${vcardEscape(profile.title)}`,
    profile.phone && `TEL;TYPE=CELL:${vcardEscape(profile.phone)}`,
    profile.email && `EMAIL;TYPE=INTERNET:${vcardEscape(profile.email)}`,
    profile.website && `URL:${vcardEscape(profile.website)}`,
    "END:VCARD",
  ].filter(Boolean).join("\r\n");

  return new Response(vcard, {
    headers: {
      "content-type": "text/vcard; charset=utf-8",
      "content-disposition": `attachment; filename="${profile.fullName.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-contact.vcf"`,
      "cache-control": "private, max-age=300",
    },
  });
}
