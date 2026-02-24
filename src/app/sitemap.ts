import type { MetadataRoute } from "next";
import { getSupabase } from "@/lib";
import type { CategoryRow, PostRow, ProductRow } from "@/types/database";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://resethomestyle.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let postUrls: MetadataRoute.Sitemap = [];
  let categoryUrls: MetadataRoute.Sitemap = [];
  let productUrls: MetadataRoute.Sitemap = [];

  try {
    const { data: posts } = await getSupabase()
      .from("posts")
      .select("slug, updated_at")
      .eq("is_published", true);

    const rows = (posts ?? []) as Pick<PostRow, "slug" | "updated_at">[];
    postUrls = rows.map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // continue without post URLs
  }

  try {
    const { data: categories } = await getSupabase()
      .from("categories")
      .select("slug");

    const rows = (categories ?? []) as Pick<CategoryRow, "slug">[];
    categoryUrls = rows.map((c) => ({
      url: `${baseUrl}/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // continue without category URLs
  }

  try {
    const { data: products } = await getSupabase()
      .from("products")
      .select("slug");

    const rows = (products ?? []) as Pick<ProductRow, "slug">[];
    productUrls = rows.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // continue without product URLs
  }

  return [...staticRoutes, ...categoryUrls, ...productUrls, ...postUrls];
}
