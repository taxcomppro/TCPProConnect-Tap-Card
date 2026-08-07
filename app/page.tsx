const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="icon" aria-hidden="true">{children}</span>
);

const Arrow = () => <span aria-hidden="true">↗</span>;

const features = [
  { icon: "◎", title: "Tap, scan, or share", text: "Open your public card by NFC tap, QR code, or a direct link—whatever fits the moment." },
  { icon: "+", title: "Save-ready contact", text: "Put contact, save, share, and QR actions up front so follow-up takes less effort." },
  { icon: "∞", title: "Your links, your way", text: "Add, reorder, style, schedule, or pause websites, booking pages, services, reviews, courses, and social links." },
  { icon: "◌", title: "Built-in visibility", text: "One activation creates your public Tap Card page and your professional Marketplace profile." },
  { icon: "◐", title: "Three visibility levels", text: "Set applicable fields as public, members-only, or private—including contact details, documents, credentials, and links." },
  { icon: "⌁", title: "Insights that help", text: "Track page views, NFC taps, QR scans, link clicks, contact saves, and full-profile visits." },
];

const managementFeatures = [
  "Add, edit, delete, and reorder links",
  "Turn links on or off and schedule when they appear",
  "Choose button colors, icons, and page themes",
  "Copy your link and download your QR code",
  "Save to Apple Wallet or Google Wallet",
  "Replace or reassign your physical card",
];

const faqs = [
  ["Does someone need an account to view my Tap Card?", "No. Your public Tap Card page is designed to open without registration, so a new contact can immediately view and use the public information you choose to share."],
  ["What happens when I activate my card?", "Your unique activation URL connects the card to your account. A single activation creates both your public Tap Card page and your Tax Compliance Pro Marketplace profile."],
  ["What can I add to my public card?", "You can present your professional details, custom links, and quick actions for contacting, saving, sharing, and viewing a QR code. What is visible is controlled from your dashboard."],
  ["How does the Marketplace profile work?", "The public card is the fast introduction. Visitors can continue to your fuller Tax Compliance Pro Marketplace profile, where an optional login or registration prompt may appear as part of the handoff."],
  ["Can I update my information later?", "Yes. Your dashboard is the control center for profile content, custom links, privacy settings, sharing tools, wallet options, card status, and analytics."],
  ["Does the card expose all of my information?", "No. Field-level controls let you choose whether applicable information is public, visible to members only, or private to you and administrators."],
  ["How much does ProConnect cost?", "ProConnect is a one-time $29 purchase—$21 less than the current $50 listed price for a comparable premium NFC business card. Competitor pricing may change."],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">A smarter first impression for professionals <span>Introducing ProConnect — $29 one time</span></div>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="proconnect-logo-v2" href="#top" aria-label="ProConnect by Tax Compliance Pro home">
          <img src="/proconnect-logo-v2.png" alt="ProConnect digital business card, a product of Tax Compliance Pro" />
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a><a href="#features">Features</a><a href="#marketplace">Marketplace</a><a href="#faq">FAQ</a>
        </div>
        <div className="nav-actions"><a className="button button-small" href="https://www.taxcomppro.com">Buy for $29 <Arrow /></a><a className="button button-small button-outline nav-activate" href="https://www.taxcomppro.com/connect">Activate Existing Card</a></div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Meet ProConnect</p>
          <h1>Your expertise.<br /><em>One powerful tap.</em></h1>
          <p className="hero-lede"><strong>Tap it. Scan it. Share it.</strong><br />Give clients and connections one simple link to find you, connect with you, and explore your full <b>Tax Compliance Pro Marketplace</b> presence.</p>
          <div className="hero-actions">
            <a className="button" href="https://www.taxcomppro.com">Buy ProConnect — $29 <Arrow /></a>
            <a className="button button-outline" href="https://www.taxcomppro.com/connect">Activate Existing Card <Arrow /></a>
            <a className="text-link" href="#how">See how it works <span>↓</span></a>
          </div>
          <div className="price-note"><strong>$29</strong><span><b>One-time price</b><small>One card. No recurring card fee.</small></span></div>
          <div className="hero-proof">
            <div><b>No app</b><span>needed to view</span></div>
            <div><b>One activation</b><span>two professional profiles</span></div>
            <div><b>You control</b><span>what people see</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Tax Compliance Pro Tap Card and public profile preview">
          <div className="gold-orbit orbit-one" /><div className="gold-orbit orbit-two" />
          <div className="card-artwork-v2" aria-label="Front and back of the ProConnect digital business card">
            <div className="card-frame card-frame-back"><img src="/proconnect-card-back.png" alt="Back of the ProConnect digital business card with tap indicator" /></div>
            <div className="card-frame card-frame-front"><img src="/proconnect-card-front.png" alt="Front of the ProConnect digital business card" /></div>
          </div>
          <div className="phone-profile">
            <div className="phone-speaker" />
            <div className="profile-cover"><span>TCP</span></div>
            <div className="avatar">JW</div>
            <h3>Jordan Williams</h3><p>Tax Compliance Professional</p>
            <div className="profile-actions"><span>☎<small>Contact</small></span><span>＋<small>Save</small></span><span>↗<small>Share</small></span><span>▦<small>QR</small></span></div>
            <div className="profile-link"><span>Professional Services</span><b>›</b></div>
            <div className="profile-link"><span>Book a Consultation</span><b>›</b></div>
            <div className="market-badge"><i>TCP</i><span>View full Marketplace profile</span><b>→</b></div>
          </div>
          <div className="tap-note"><span className="pulse-dot" /> <b>Tap detected</b><small>Profile opens instantly</small></div>
        </div>
      </section>

      <section className="trust-strip">
        <p>One professional identity, ready for</p>
        <div><span>CLIENT MEETINGS</span><i>•</i><span>NETWORKING EVENTS</span><i>•</i><span>REFERRAL PARTNERS</span><i>•</i><span>EVERYDAY CONNECTIONS</span></div>
      </section>

      <section className="price-band">
        <div className="shell price-band-inner">
          <div><p className="eyebrow"><span /> Premium value</p><h2>Professional connection<br />without the premium price.</h2></div>
          <div className="price-compare">
            <div className="our-price"><small>ProConnect</small><strong>$29</strong><span>one time</span></div>
            <div className="versus">vs.</div>
            <div className="their-price"><small>Competitor pricing</small><strong>$50</strong><span>comparable card</span></div>
          </div>
          <div className="savings"><strong>Save $21</strong><span>ProConnect is 42% less than the current listed price for a comparable premium NFC business card.</span><small>Competitor pricing checked August 7, 2026 and may change.</small></div>
        </div>
      </section>

      <section className="intro shell section" id="how">
        <div className="section-heading">
          <p className="eyebrow"><span /> More than a business card</p>
          <h2>From introduction<br />to <em>opportunity.</em></h2>
        </div>
        <div className="intro-copy">
          <p>It gives you one simple, shareable profile where clients and professional connections can quickly find your contact information, services, social links, and more.</p>
          <p>Update your information anytime—no reprinting business cards.</p>
        </div>
      </section>

      <section className="steps shell section">
        <article><span className="step-num">01</span><Icon>▣</Icon><h3>Purchase for $29</h3><p>Order your ProConnect card once through taxcomppro.com.</p></article>
        <article><span className="step-num">02</span><Icon>⌁</Icon><h3>Activate once</h3><p>Tap your card or visit taxcomppro.com/connect to build your profile and choose your public URL.</p></article>
        <article><span className="step-num">03</span><Icon>◎</Icon><h3>Publish two profiles</h3><p>Activation creates your public Tap Card page and Marketplace profile together.</p></article>
        <article><span className="step-num">04</span><Icon>↗</Icon><h3>Tap. Share. Grow.</h3><p>Connect in person, by QR, or by link—and refine your presence with analytics.</p></article>
      </section>

      <section className="feature-section section" id="features">
        <div className="shell">
          <div className="center-heading">
            <p className="eyebrow light"><span /> Made for modern professionals</p>
            <h2>Everything you need to<br /><em>connect with confidence.</em></h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => <article key={feature.title}><Icon>{feature.icon}</Icon><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="marketplace shell section" id="marketplace">
        <div className="market-visual">
          <div className="market-window">
            <div className="window-top"><span /><span /><span /><b>marketplace.taxcomppro.com</b></div>
            <div className="window-body">
              <div className="window-banner"><i>TCP</i><span>Verified Professional Profile</span></div>
              <div className="window-person"><div>JW</div><span><b>Jordan Williams</b><small>Tax Compliance Professional</small></span></div>
              <div className="window-tags"><span>Tax Preparation</span><span>Business Tax</span><span>Advisory</span></div>
              <p>Helping individuals and growing businesses navigate tax compliance with clarity and confidence.</p>
              <button type="button">View services & credentials <b>→</b></button>
            </div>
          </div>
          <div className="connection-line"><span>Public Tap Card</span><i>→</i><span>Marketplace Profile</span></div>
        </div>
        <div className="market-copy">
          <p className="eyebrow"><span /> Connected to the Marketplace</p>
          <h2>A quick introduction.<br /><em>A complete presence.</em></h2>
          <p>Your public card keeps the first interaction fast. When someone wants to learn more, they can continue to your fuller Marketplace profile—without asking you to repeat your story.</p>
          <ul>
            <li><span>✓</span><div><b>One profile foundation</b><small>Create your public card and Marketplace presence from one activation.</small></div></li>
            <li><span>✓</span><div><b>A natural next step</b><small>Guide serious prospects from key details to deeper professional information.</small></div></li>
            <li><span>✓</span><div><b>Optional member handoff</b><small>The fuller profile experience can invite visitors to log in or register when appropriate.</small></div></li>
          </ul>
        </div>
      </section>

      <section className="control section">
        <div className="shell control-grid">
          <div className="control-copy">
            <p className="eyebrow light"><span /> Your profile, your rules</p>
            <h2>Stay visible.<br /><em>Stay in control.</em></h2>
            <p>Your dashboard keeps the details behind your first impression easy to manage. Update what people see, decide what is public, members-only, or private, and understand how your profile is working for you.</p>
            <div className="control-points"><span><b>◉</b> Content & custom links</span><span><b>◐</b> Privacy controls</span><span><b>▦</b> QR & sharing tools</span><span><b>⌁</b> Profile analytics</span></div>
            <div className="management-list">{managementFeatures.map(item => <span key={item}>✓ {item}</span>)}</div>
          </div>
          <div className="dashboard-card">
            <div className="dash-head"><span><i>TCP</i> Dashboard</span><b>Live ●</b></div>
            <div className="dash-body">
              <div className="dash-stat"><span>Profile views<small>Last 30 days</small></span><b>428 <i>+18%</i></b></div>
              <div className="bars"><i style={{height:'38%'}} /><i style={{height:'52%'}} /><i style={{height:'44%'}} /><i style={{height:'70%'}} /><i style={{height:'58%'}} /><i style={{height:'82%'}} /><i style={{height:'95%'}} /><i style={{height:'78%'}} /></div>
              <div className="dash-row"><span><i>◉</i> Public card status</span><b>Active</b></div>
              <div className="dash-row"><span><i>◐</i> Privacy controls</span><b>Manage →</b></div>
              <div className="dash-row"><span><i>▦</i> Share, QR & Wallet</span><b>Open →</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq shell section" id="faq">
        <div className="faq-heading"><p className="eyebrow"><span /> Questions, answered</p><h2>Everything you need<br />to know.</h2><p>Still have questions? Visit Tax Compliance Pro for product and account support.</p><a className="text-link" href="https://www.taxcomppro.com">Visit Tax Compliance Pro <Arrow /></a></div>
        <div className="faq-list">{faqs.map(([q,a], index) => <details key={q} open={index===0}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="final-cta">
        <div className="cta-glow" />
        <div className="shell cta-inner">
          <p className="eyebrow light"><span /> Your next connection starts here</p>
          <h2>One card. One profile.<br /><em>More ways to grow.</em></h2>
          <p>Make every introduction easier to remember—and every next step easier to take.</p>
          <a className="button gold-button" href="https://www.taxcomppro.com">Buy ProConnect — $29 <Arrow /></a>
          <small>One-time price · Available through Tax Compliance Pro</small>
        </div>
      </section>

      <footer>
        <div className="shell footer-main">
          <a className="proconnect-wordmark wordmark-light" href="#top" aria-label="ProConnect by Tax Compliance Pro home"><span className="wordmark-main"><b>PRO</b>CONNECT <i>)))</i></span><span className="wordmark-sub">Digital Business Card · Tax Compliance Pro</span></a>
          <p>Professional connection tools for professionals.</p>
          <div><a href="#how">How it works</a><a href="#features">Features</a><a href="#marketplace">Marketplace</a><a href="#faq">FAQ</a></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Tax Compliance Pro. All rights reserved.</span><a href="https://www.taxcomppro.com">www.taxcomppro.com</a></div>
      </footer>
    </main>
  );
}
