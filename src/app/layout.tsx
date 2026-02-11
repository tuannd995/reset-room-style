import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default:
      "Room Reset Style - Bedroom Styling Tips & Product Recommendations",
    template: "%s | Room Reset Style",
  },
  description:
    "Discover cozy bedroom styling tips, curated product recommendations, and inspiration to transform your space into a peaceful sanctuary.",
  keywords: [
    "bedroom styling",
    "bedroom decor",
    "bedroom lighting",
    "bedding",
    "small bedroom ideas",
    "bedroom storage",
  ],
  authors: [{ name: "Room Reset Style" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Room Reset Style",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#FAF8F6]">
        <ProgressBar />
        <div className="min-h-screen flex flex-col">
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
