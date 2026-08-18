/**
 * Single source of truth for site-wide constants.
 * Nothing in here should be retyped anywhere else in the codebase.
 */
export const SITE_URL = "https://www.crea-development.com";
export const SITE_NAME = "Crea Development";
export const SITE_ALT_NAME = "CREA Development";
export const DEFAULT_TITLE =
  "Crea Development | Luxury Residential Development in Arizona";
export const TITLE_TEMPLATE = "%s | Crea Development";
export const DEFAULT_DESCRIPTION =
  "Crea Development is a Scottsdale-based luxury residential development firm building ground-up spec homes in Paradise Valley, Arcadia, Scottsdale, and the Biltmore area.";
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";
export const LOGO_PATH = "/images/logo.png";

/** Office contact details. All of this is already public on the live site. */
export const CONTACT = {
  phone: "480-341-1881",
  phoneE164: "+1-480-341-1881",
  email: "Alex@crea-development.com",
  street: "14982 N 83rd Pl",
  city: "Scottsdale",
  region: "AZ",
  postal: "85260",
  country: "US",
  instagram: "https://www.instagram.com/creadevelopment",
} as const;

export const MARKETS = [
  "Paradise Valley",
  "Arcadia",
  "Scottsdale",
  "Biltmore",
] as const;
export type Market = (typeof MARKETS)[number];
