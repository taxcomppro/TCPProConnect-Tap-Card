export type ProConnectLink = {
  label: string;
  url: string;
  description?: string;
};

export type ProConnectProfile = {
  cardToken: string;
  fullName: string;
  initials: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  phone: string;
  email: string;
  website: string;
  bookingUrl: string;
  marketplaceUrl: string;
  verified: boolean;
  specialties: string[];
  links: ProConnectLink[];
};

export const demoProfile: ProConnectProfile = {
  cardToken: "demo-jordan-williams",
  fullName: "Jordan Williams",
  initials: "JW",
  title: "Tax Compliance Professional",
  company: "Williams Tax & Advisory",
  location: "Houston, Texas",
  bio: "Helping individuals and growing businesses make confident tax decisions with clear guidance and year-round support.",
  phone: "+17135550184",
  email: "jordan@example.com",
  website: "https://www.taxcomppro.com",
  bookingUrl: "https://www.taxcomppro.com",
  marketplaceUrl: "https://www.taxcomppro.com",
  verified: true,
  specialties: ["Tax Preparation", "Business Tax", "Advisory"],
  links: [
    {
      label: "Book a consultation",
      description: "Choose a time that works for you",
      url: "https://www.taxcomppro.com",
    },
    {
      label: "Explore professional services",
      description: "Tax preparation, business tax, and advisory",
      url: "https://www.taxcomppro.com",
    },
    {
      label: "Visit my website",
      description: "Learn more about Williams Tax & Advisory",
      url: "https://www.taxcomppro.com",
    },
  ],
};

export async function getPublicProfile(cardToken: string) {
  // This exact token keeps review previews runnable without staging data.
  if (cardToken === demoProfile.cardToken) return demoProfile;

  const { findPublicProfileByCardToken } = await import("./proconnect-repository");
  return findPublicProfileByCardToken(cardToken);
}
