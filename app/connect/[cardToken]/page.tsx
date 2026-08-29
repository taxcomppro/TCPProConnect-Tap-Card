import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublicProfile } from "@/lib/proconnect-profile";
import { ProfileActions } from "./profile-actions";
import { ConnectionExchange } from "./connection-exchange";

type PublicCardPageProps = {
  params: Promise<{ cardToken: string }>;
};

export async function generateMetadata({ params }: PublicCardPageProps): Promise<Metadata> {
  const { cardToken } = await params;
  const profile = await getPublicProfile(cardToken);
  if (!profile) return { title: "ProConnect Card Not Found" };
  return {
    title: `${profile.fullName} | ProConnect`,
    description: `${profile.title} at ${profile.company}. Connect, save contact details, and view professional services.`,
    openGraph: {
      title: `${profile.fullName} | ProConnect`,
      description: `${profile.title} at ${profile.company}`,
      images: [],
    },
    twitter: { card: "summary", title: `${profile.fullName} | ProConnect`, images: [] },
  };
}

export default async function PublicCardPage({ params }: PublicCardPageProps) {
  const { cardToken } = await params;
  const profile = await getPublicProfile(cardToken);
  if (!profile) notFound();

  return (
    <main className="public-profile-page">
      <div className="public-profile-shell">
        <header className="public-profile-brand">
          <a href="https://www.taxcomppro.com" aria-label="Tax Compliance Pro home">
            <Image src="/proconnect-logo-v2.png" alt="ProConnect by Tax Compliance Pro" width={178} height={48} priority />
          </a>
          <span>Digital Business Card</span>
        </header>

        <section className="public-profile-card">
          <div className="public-profile-cover" aria-hidden="true">
            <span>TCP</span><i /><i /><i />
          </div>
          <div className="public-profile-avatar" aria-label={`${profile.fullName} profile image`}>{profile.initials}</div>
          <div className="public-profile-identity">
            <div className="public-profile-name-line">
              <h1>{profile.fullName}</h1>
              {profile.verified ? <span className="verified-mark" title="Verified Tax Compliance Pro member">✓</span> : null}
            </div>
            <p>{profile.title}</p>
            <strong>{profile.company}</strong>
            <small>{profile.location}</small>
          </div>

          <ProfileActions cardToken={profile.cardToken} profileName={profile.fullName} phone={profile.phone} email={profile.email} />

          <div className="public-profile-body">
            <p className="public-profile-bio">{profile.bio}</p>
            <div className="specialty-list" aria-label="Professional specialties">
              {profile.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}
            </div>

            <div className="public-profile-links">
              {profile.links.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  <span><b>{link.label}</b>{link.description && <small>{link.description}</small>}</span>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>

            {profile.marketplaceUrl ? <a className="marketplace-profile-link" href={profile.marketplaceUrl} target="_blank" rel="noreferrer">
              <span className="marketplace-profile-mark">TCP</span>
              <span><small>Verified professional</small><b>View full Marketplace profile</b></span>
              <i aria-hidden="true">→</i>
            </a> : null}

            <ConnectionExchange cardToken={profile.cardToken} firstName={profile.fullName.split(" ")[0]} />
          </div>
        </section>

        <footer className="public-profile-footer">
          <span>Powered by <b>ProConnect</b></span>
          <a href="https://www.taxcomppro.com">Tax Compliance Pro</a>
        </footer>
      </div>
    </main>
  );
}
