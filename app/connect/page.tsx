import type { Metadata } from "next";
import Image from "next/image";
import { CardCodeForm } from "./card-code-form";

export const metadata: Metadata = {
  title: "Open Your ProConnect Card | Tax Compliance Pro",
  description: "Open a unique ProConnect digital business card.",
};

export default function ConnectPage() {
  return (
    <main className="connect-entry-page">
      <section className="connect-entry-card">
        <Image src="/proconnect-logo-v2.png" alt="ProConnect by Tax Compliance Pro" width={220} height={58} priority />
        <p className="eyebrow"><span /> One tap. One professional connection.</p>
        <h1>Open a ProConnect card</h1>
        <p>If you arrived here from a card encoded with our original shared address, enter the unique code printed on the card.</p>
        <CardCodeForm />
        <a href="https://www.taxcomppro.com">Need help? Visit Tax Compliance Pro</a>
      </section>
    </main>
  );
}
