"use client";

import { FormEvent, useState } from "react";

export function ConnectionExchange({ cardToken, firstName }: { cardToken: string; firstName: string }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/proconnect/cards/${encodeURIComponent(cardToken)}/connections`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      setState(response.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="exchange-card">
      <span className="exchange-icon" aria-hidden="true">⌁</span>
      <div><h2>Stay connected</h2><p>Share your information securely with {firstName}.</p></div>
      {!open && <button type="button" onClick={() => setOpen(true)}>Share my info</button>}
      {open && state !== "success" && (
        <form className="connection-form" onSubmit={submit}>
          <label>Name<input name="name" required maxLength={100} autoComplete="name" /></label>
          <label>Email<input name="email" type="email" maxLength={160} autoComplete="email" /></label>
          <label>Phone<input name="phone" type="tel" maxLength={40} autoComplete="tel" /></label>
          <label>Note<textarea name="note" maxLength={500} rows={3} /></label>
          <label className="consent-row"><input name="consent" type="checkbox" value="yes" required /> I agree to share these details with this professional.</label>
          <input className="connection-honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          {state === "error" && <p role="alert">We couldn’t share your information. Please try again.</p>}
          <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sharing…" : "Share securely"}</button>
        </form>
      )}
      {state === "success" && <p className="connection-success" role="status">✓ Your information was shared.</p>}
    </section>
  );
}
