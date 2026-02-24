import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://resethomestyle.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reset Homestyle – Small Home Office Solutions",
    short_name: "Reset Homestyle",
    description:
      "Smart solutions for small home offices: space-saving desks, ergonomic chairs, and practical setup guides.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAF8F6",
    theme_color: "#2C2416",
    orientation: "portrait-primary",
    lang: "en",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
  };
}
