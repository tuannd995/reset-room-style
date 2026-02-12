import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib";
import {
  getPostBySlug,
  getPostsByCategory,
  getProductsByCategory,
} from "@/lib";
import PostCard from "@/components/PostCard";
import ProductBox from "@/components/ProductBox";
import TableOfContents from "@/components/TableOfContents";
import DbImage from "@/components/ui/DbImage";
import { markdownToHtml } from "@/utils/markdown";
import type { Product as LegacyProduct } from "@/types";
import type { PostWithCategory, ProductWithCategory } from "@/lib";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getSupabase()
    .from("posts")
    .select("slug")
    .eq("is_published", true);

  const rows = (data ?? []) as { slug: string }[];
  return rows.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.seo_title?.trim() || post.title;
  const description =
    post.seo_description?.trim() || post.excerpt?.trim() || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
    },
  };
}

function mapProduct(p: ProductWithCategory): LegacyProduct {
  return {
    id: p.id,
    name: p.name,
    description: p.short_description,
    image: p.image,
    benefits: [p.short_description],
    affiliateLink: p.amazon_link ?? undefined,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: postData } = await getPostBySlug(slug);

  if (!postData) {
    notFound();
  }

  const { data: relatedDbPosts } = await getPostsByCategory(
    postData.category.slug
  );
  const relatedPosts: PostWithCategory[] = (relatedDbPosts ?? [])
    .filter((p) => p.slug !== postData.slug)
    .slice(0, 3);

  const { data: dbProducts } = await getProductsByCategory(
    postData.category.slug,
    1,
    0
  );
  const featuredProduct: LegacyProduct | null =
    dbProducts && dbProducts.length > 0 ? mapProduct(dbProducts[0]) : null;

  const categoryName = postData.category.name;
  const htmlContent = markdownToHtml(postData.content);
  const readTime = Math.max(
    1,
    Math.round(
      (postData.content ? postData.content.trim().split(/\s+/).length : 0) / 220
    )
  );

  return (
    <article className="bg-[#FAF8F6]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F5F3F0] to-[#FAF8F6] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/category/${postData.category.slug}`}
            className="link inline-block mb-6 text-[#8B7355] hover:text-[#2C2416] transition-colors duration-300 font-medium"
          >
            ← Back to {categoryName}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-6 leading-tight">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#8B7355]">
            {postData.created_at && (
              <>
                <span>
                  {new Date(postData.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
              </>
            )}
            <span>{readTime} min read</span>
            <span>•</span>
            <span>By Room Reset Style</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
          <DbImage
            src={postData.featured_image || undefined}
            alt={postData.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <TableOfContents content={postData.content} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Product Box Example */}
              {featuredProduct && <ProductBox product={featuredProduct} />}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-20 pt-16 border-t border-[#D4C4B0]/30">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mb-10 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
