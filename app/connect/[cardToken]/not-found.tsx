import Image from "next/image";

export default function CardNotFound() {
  return (
    <main className="connect-entry-page">
      <section className="connect-entry-card">
        <Image src="/proconnect-logo-v2.png" alt="ProConnect by Tax Compliance Pro" width={220} height={58} priority />
        <p className="eyebrow"><span /> Card unavailable</p>
        <h1>We couldn’t open this card.</h1>
        <p>The card may not be activated yet, may have been suspended, or the address may be incomplete.</p>
        <a className="button" href="/connect">Try a card code</a>
        <a href="https://www.taxcomppro.com">Contact Tax Compliance Pro support</a>
      </section>
    </main>
  );
}
