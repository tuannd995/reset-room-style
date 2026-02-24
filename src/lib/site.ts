/**
 * Site copy for Hero and layout. Override via env:
 * NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_SLOGAN, NEXT_PUBLIC_SITE_DESCRIPTION
 */
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Reset Homestyle";

export const siteSlogan =
  process.env.NEXT_PUBLIC_SITE_SLOGAN ??
  "Smart Solutions for Small Home Offices";

export const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "Practical guides on choosing space-saving desks, ergonomic chairs, and smart accessories to help you build a productive workspace — even in limited space.";
