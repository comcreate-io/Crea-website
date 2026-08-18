import { absoluteUrl } from "@/lib/routes";
import {
  CONTACT,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  LOGO_PATH,
  MARKETS,
  SITE_ALT_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type JsonLdObject = Record<string, unknown>;

/**
 * Site-wide business entity. Crea is a developer, not a brokerage or a
 * contractor, so Organization + LocalBusiness is the accurate pairing.
 * The office address and phone are already public on the site.
 * No legalName, founder, employee or Person nodes until the client clears them.
 */
export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    telephone: CONTACT.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postal,
      addressCountry: CONTACT.country,
    },
    areaServed: MARKETS.map((name) => ({
      "@type": "Place",
      name: `${name}, AZ`,
    })),
    knowsAbout: [
      "Luxury residential development",
      "Ground-up spec homes",
      "Off-market land acquisition",
      "Real estate underwriting",
      "Paradise Valley real estate",
      "Scottsdale real estate",
      "Arcadia real estate",
      "Biltmore real estate",
    ],
    sameAs: [CONTACT.instagram],
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(args: {
  path: string;
  headline: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(args.path) },
    headline: args.headline,
    description: args.description,
    image: [absoluteUrl(args.image ?? DEFAULT_OG_IMAGE)],
    datePublished: args.publishedAt,
    dateModified: args.updatedAt ?? args.publishedAt,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}
