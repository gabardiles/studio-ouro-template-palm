export interface Stat {
  label: string;
  value: string;
}

export interface Section {
  heading: string;
  body: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface Reference {
  title: string;
  description: string;
  image?: string | null;
  images?: string[] | null;
}

export interface Service {
  title: string;
  description: string;
  icon: string | null;
  slug: string;
  pageTitle: string;
  pageDescription: string;
  preamble: string;
  heroImage: string | null;
  sections: Section[];
  highlights: Highlight[];
  faq: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  text: string;
}

export interface Usp {
  title: string;
  description: string;
}

export interface BeforeAfterItem {
  title: string;
  description: string;
  category: string;
}

export interface LocationItem {
  city: string;
  description: string;
  seo_title: string;
}

export type RadiusKey = "none" | "subtle" | "rounded" | "soft" | "pill";
export type ColorMode = "light" | "dark";

export interface ClientConfig {
  pages: string[];
  /** Skill IDs active for this project — always check with .includes() */
  skills?: string[] | null;

  meta: {
    title: string;
    description: string;
    language: string;
    token: string;
    domain: string;
  };
  brand: {
    name: string;
    logo: string | null;
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    titleFont: string;
    bodyFont: string;
    mode: ColorMode;
    radius: RadiusKey;
    font: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: {
      primary: { text: string; href: string };
      secondary: { text: string; href: string };
    };
    image: string | null;
    badge: string | null;
  };
  about: {
    title: string;
    body: string;
    secondaryBody: string;
    founded: number | string | null;
    teamSize: number | null;
    stats: Stat[];
    image: string | null;
    slug: string;
    pageTitle: string;
    pageDescription: string;
    sections: Section[];
  };
  services: Service[];
  usps: Usp[];
  references: Reference[];
  reviews: {
    score: number | null;
    count: string;
    platform: string;
    url: string | null;
    show: boolean;
    testimonials: Testimonial[];
  };
  trust: {
    certifications: string[];
    memberships: string[];
    insurance: string | null;
  };
  faq: FaqItem[];
  contact: {
    phone: string | null;
    email: string | null;
    leadsEmail?: string | null;
    address: string | null;
    hours: string | null;
    emergency: string | null;
    mapUrl: string | null;
    formEnabled: boolean;
    leadFormUrl?: string | null;
  };
  social: {
    facebook: string | null;
    instagram: string | null;
  };
  footer: {
    tagline: string;
    showCertifications: boolean;
    showReviews: boolean;
  };
  seo: {
    geo: {
      city: string;
      region: string | null;
      country: string;
      lat: number | null;
      lng: number | null;
    };
    serviceArea: string[];
    keywords: string[];
    businessType: string;
  };
  schema: {
    enabled: boolean;
    localBusiness: boolean;
    faqPage: boolean;
    breadcrumb: boolean;
  };
  /** @deprecated — use skills.includes("chatbot") instead */
  chatbot?: boolean | null;

  quoteFlow?: {
    enabled: boolean;
    responseTime?: string | null;
    buttonLabel?: string | null;
  } | null;

  beforeAfter?: {
    headline: string;
    intro: string;
    items: BeforeAfterItem[];
  } | null;

  locations?: {
    headline: string;
    intro: string;
    items: LocationItem[];
  } | null;
}
