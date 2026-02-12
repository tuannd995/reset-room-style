/**
 * Site copy for Hero and layout. Override via env:
 * NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_SLOGAN, NEXT_PUBLIC_SITE_DESCRIPTION
 */
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Room Reset Style";

export const siteSlogan =
  process.env.NEXT_PUBLIC_SITE_SLOGAN ?? "Reset Your Room. Reset Your Mind.";

export const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "Discover cozy bedroom styling tips, curated product recommendations, and inspiration to transform your space into a peaceful sanctuary.";
