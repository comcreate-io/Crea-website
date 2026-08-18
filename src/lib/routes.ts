import { SITE_URL } from "@/lib/site";

export type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SiteRoute {
  /** Leading slash, no trailing slash (root is "/"). */
  path: string;
  /** Short label used for breadcrumbs and nav. */
  title: string;
  changeFrequency: ChangeFreq;
  priority: number;
  /** ISO date; omit to use build time. */
  lastModified?: string;
  /** Default true. false excludes the route from the sitemap. */
  index?: boolean;
}

/**
 * Route registry. Only routes that exist and return 200 belong here.
 * Add an entry in the same PR that adds the page.
 */
export const STATIC_ROUTES: SiteRoute[] = [
  { path: "/", title: "Home", changeFrequency: "monthly", priority: 1.0 },
  {
    path: "/privacy",
    title: "Privacy Policy",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/terms",
    title: "Terms of Use",
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

export function allRoutes(): SiteRoute[] {
  return [...STATIC_ROUTES];
}

export function indexableRoutes(): SiteRoute[] {
  return allRoutes().filter((r) => r.index !== false);
}

/**
 * Absolute, canonical URL for a path: https, www, no trailing slash.
 * The root resolves to SITE_URL itself (no trailing slash) because Next.js
 * strips the trailing slash from the rendered canonical, and the sitemap
 * must emit exactly the same string so canonical == sitemap URL for every page.
 */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return SITE_URL;
  return `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}
