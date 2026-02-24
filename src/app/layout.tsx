import type { Metadata } from "next";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://resethomestyle.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Small Home Office Solutions | Reset Homestyle",
    template: "%s | Reset Homestyle",
  },
  description:
    "Discover smart solutions for small home offices. Explore space-saving desks, ergonomic chairs, and practical setup guides designed for compact workspaces.",
  keywords: [
    "small home office solutions",
    "space-saving desks",
    "ergonomic chairs for small spaces",
    "small workspace layout",
    "home office accessories",
  ],
  authors: [{ name: "Reset Homestyle", url: baseUrl }],
  creator: "Reset Homestyle",
  publisher: "Reset Homestyle",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Reset Homestyle",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Home Office Solutions | Reset Homestyle",
    description:
      "Discover smart solutions for small home offices. Explore space-saving desks, ergonomic chairs, and practical setup guides.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Reset Homestyle",
  url: baseUrl,
  description:
    "Practical resource for small home office solutions: space-saving desks, ergonomic chairs, and setup guides for compact workspaces.",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#FAF8F6]">{children}</body>
    </html>
  );
}
