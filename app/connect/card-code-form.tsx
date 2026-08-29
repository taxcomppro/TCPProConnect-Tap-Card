"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CardCodeForm() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = code.trim();
    if (normalized) router.push(`/connect/${encodeURIComponent(normalized)}`);
  }

  return (
    <form className="card-code-form" onSubmit={submit}>
      <label htmlFor="card-code">Card code</label>
      <div><input id="card-code" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter the code printed on the card" autoComplete="off" required minLength={8} /><button type="submit">Open card</button></div>
      <small>For privacy, the code identifies the card—not the member.</small>
    </form>
  );
}
