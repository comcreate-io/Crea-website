import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/routes";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site";

interface PageMetaArgs {
  /** Route path, leading slash. */
  path: string;
  /** Page title without the brand suffix (the root template appends it). */
  title: string;
  description: string;
  /** Path or absolute URL for a page-specific share image. */
  ogImage?: string;
  /** Set false to keep a page out of the index while it is drafted. */
  index?: boolean;
}

/**
 * Per-page metadata helper. Every page.tsx should call this so canonical and
 * og:url always point at the page itself, never at the homepage.
 */
export function pageMeta({
  path,
  title,
  description,
  ogImage,
  index = true,
}: PageMetaArgs): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl(ogImage ?? DEFAULT_OG_IMAGE);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
