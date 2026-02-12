import { supabase } from "./supabase";
import type { CategoryRow, PostRow, ProductRow } from "@/types/database";

// --- App-facing types (used by pages/components) ---
export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface PostWithCategory {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category_id: string;
  category: { name: string; slug: string };
  seo_title: string | null;
  seo_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  short_description: string;
  amazon_link: string | null;
  rating: number | null;
  category_id: string;
  category: { name: string; slug: string } | null;
  created_at: string;
}

// --- Helpers ---
function toCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    created_at: row.created_at,
  };
}

function toPostWithCategory(
  row: PostRow,
  category: { name: string; slug: string }
): PostWithCategory {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    featured_image: row.featured_image,
    category_id: row.category_id,
    category,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    is_published: row.is_published,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function toProductWithCategory(
  row: ProductRow,
  category: { name: string; slug: string } | null
): ProductWithCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    image: row.image,
    short_description: row.short_description,
    amazon_link: row.amazon_link,
    rating: row.rating,
    category_id: row.category_id,
    category,
    created_at: row.created_at,
  };
}

// --- Query functions ---

/**
 * Latest published posts, ordered by created_at desc.
 * Includes category name and slug.
 */
export async function getLatestPosts(
  limit: number = 10
): Promise<{ data: PostWithCategory[]; error: Error | null }> {
  try {
    const { data, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    const posts = (data ?? []) as PostRow[];

    if (postsError) {
      return { data: [], error: new Error(postsError.message) };
    }

    if (!posts.length) {
      return { data: [], error: null };
    }

    const categoryIds = [...new Set(posts.map((p) => p.category_id))];
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .in("id", categoryIds);

    if (catError) {
      return { data: [], error: new Error(catError.message) };
    }

    const categoryMap = new Map(
      (categories ?? []).map(
        (c: { id: string; name: string; slug: string }) => [
          c.id,
          { name: c.name, slug: c.slug },
        ]
      )
    );

    const result: PostWithCategory[] = posts.map((row) =>
      toPostWithCategory(
        row,
        categoryMap.get(row.category_id) ?? { name: "", slug: "" }
      )
    );

    return { data: result, error: null };
  } catch (err) {
    return {
      data: [],
      error: err instanceof Error ? err : new Error("getLatestPosts failed"),
    };
  }
}

/**
 * Single post by slug with category info.
 */
export async function getPostBySlug(
  slug: string
): Promise<{ data: PostWithCategory | null; error: Error | null }> {
  try {
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (postError) {
      return { data: null, error: new Error(postError.message) };
    }

    const post = postData as PostRow | null;
    if (!post) {
      return { data: null, error: null };
    }

    const { data: categoryData, error: catError } = await supabase
      .from("categories")
      .select("name, slug")
      .eq("id", post.category_id)
      .maybeSingle();

    if (catError) {
      return { data: null, error: new Error(catError.message) };
    }

    const categoryInfo = categoryData
      ? {
          name: (categoryData as { name: string; slug: string }).name,
          slug: (categoryData as { name: string; slug: string }).slug,
        }
      : { name: "", slug: "" };

    return {
      data: toPostWithCategory(post, categoryInfo),
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("getPostBySlug failed"),
    };
  }
}

/**
 * All published posts in a category (by category slug).
 */
export async function getPostsByCategory(
  categorySlug: string
): Promise<{ data: PostWithCategory[]; error: Error | null }> {
  try {
    const { data: categoryData, error: catError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (catError) {
      return { data: [], error: new Error(catError.message) };
    }

    const category = categoryData as CategoryRow | null;
    if (!category) {
      return { data: [], error: null };
    }

    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .eq("category_id", category.id)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (postsError) {
      return { data: [], error: new Error(postsError.message) };
    }

    const posts = (postsData ?? []) as PostRow[];
    const categoryInfo = { name: category.name, slug: category.slug };
    const result: PostWithCategory[] = posts.map((row) =>
      toPostWithCategory(row, categoryInfo)
    );

    return { data: result, error: null };
  } catch (err) {
    return {
      data: [],
      error:
        err instanceof Error ? err : new Error("getPostsByCategory failed"),
    };
  }
}

/**
 * Products in a category (by category slug), with pagination.
 */
export async function getProductsByCategory(
  categorySlug: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  data: ProductWithCategory[];
  category: Category | null;
  error: Error | null;
}> {
  try {
    const { data: categoryData, error: catError } = await supabase
      .from("categories")
      .select("id, name, slug, created_at")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (catError) {
      return { data: [], category: null, error: new Error(catError.message) };
    }

    const category = categoryData as CategoryRow | null;
    if (!category) {
      return { data: [], category: null, error: null };
    }

    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", category.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (productsError) {
      return {
        data: [],
        category: toCategory(category),
        error: new Error(productsError.message),
      };
    }

    const products = (productsData ?? []) as ProductRow[];
    const categoryInfo = { name: category.name, slug: category.slug };
    const result: ProductWithCategory[] = products.map((row) =>
      toProductWithCategory(row, categoryInfo)
    );

    return {
      data: result,
      category: toCategory(category),
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      category: null,
      error:
        err instanceof Error ? err : new Error("getProductsByCategory failed"),
    };
  }
}

/**
 * All categories (for nav/footer).
 */
export async function getCategories(): Promise<{
  data: Category[];
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, created_at")
      .order("name", { ascending: true });

    if (error) {
      return { data: [], error: new Error(error.message) };
    }

    const rows = (data ?? []) as CategoryRow[];
    return {
      data: rows.map(toCategory),
      error: null,
    };
  } catch (err) {
    return {
      data: [],
      error: err instanceof Error ? err : new Error("getCategories failed"),
    };
  }
}
