"use client";

import { useState } from "react";

type ProfileActionsProps = {
  cardToken: string;
  profileName: string;
  phone: string;
  email: string;
};

export function ProfileActions({ cardToken, profileName, phone, email }: ProfileActionsProps) {
  const [shared, setShared] = useState(false);

  async function shareProfile() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${profileName} | ProConnect`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShared(false);
    }
  }

  return (
    <div className="public-profile-actions" aria-label="Contact actions">
      {phone ? <a href={`tel:${phone}`} aria-label={`Call ${profileName}`}>
        <span aria-hidden="true">☎</span>
        <small>Call</small>
      </a> : null}
      {phone ? <a href={`sms:${phone}`} aria-label={`Text ${profileName}`}>
        <span aria-hidden="true">◌</span>
        <small>Text</small>
      </a> : null}
      {email ? <a href={`mailto:${email}`} aria-label={`Email ${profileName}`}>
        <span aria-hidden="true">✉</span>
        <small>Email</small>
      </a> : null}
      <a href={`/api/proconnect/cards/${encodeURIComponent(cardToken)}/contact.vcf`} aria-label={`Save ${profileName} to contacts`}>
        <span aria-hidden="true">＋</span>
        <small>Save</small>
      </a>
      <button type="button" onClick={shareProfile} aria-label={`Share ${profileName}'s profile`}>
        <span aria-hidden="true">↗</span>
        <small>{shared ? "Copied" : "Share"}</small>
      </button>
    </div>
  );
}
