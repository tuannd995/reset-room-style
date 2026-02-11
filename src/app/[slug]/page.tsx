import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { posts, products } from "@/data/mockData";
import PostCard from "@/components/PostCard";
import ProductBox from "@/components/ProductBox";
import TableOfContents from "@/components/TableOfContents";
import { markdownToHtml } from "@/utils/markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

const postImages: Record<string, string> = {
  "10-cozy-bedroom-lighting-ideas":
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2058",
  "best-bedding-materials-guide":
    "https://images.unsplash.com/photo-1631889993954-3b055f447d3a?q=80&w=2070",
  "small-bedroom-design-tips":
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070",
  "bedroom-storage-solutions":
    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070",
  "ambient-lighting-bedroom":
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070",
  "luxury-bedding-on-budget":
    "https://images.unsplash.com/photo-1616628188467-8c1cbfe0c8a3?q=80&w=2070",
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const categoryName = post.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const htmlContent = markdownToHtml(post.content);
  const imageUrl =
    postImages[post.slug] ||
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070";

  return (
    <article className="bg-[#FAF8F6]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F5F3F0] to-[#FAF8F6] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/category/${post.category}`}
            className="inline-block mb-6 text-[#8B7355] hover:text-[#2C2416] transition-colors duration-300 font-medium"
          >
            ← Back to {categoryName}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#8B7355]">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime} min read</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={imageUrl}
            alt={post.title}
            width={1200}
            height={675}
            className="object-cover w-full h-full"
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
              <TableOfContents content={post.content} />
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
              {products.length > 0 && <ProductBox product={products[0]} />}
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-20 pt-16 border-t border-[#D4C4B0]/30">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mb-10 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <PostCard key={relatedPost.slug} post={relatedPost} />
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
