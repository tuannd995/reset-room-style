import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabase, getCategories, getPostsByCategory } from "@/lib";
import { siteName } from "@/lib/site";
import PostCard from "@/components/PostCard";
import SectionContainer from "@/components/ui/SectionContainer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getSupabase().from("categories").select("slug");
  const rows = (data ?? []) as { slug: string }[];
  return rows.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: dbCategories } = await getCategories();
  const category = (dbCategories ?? []).find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const description = `Browse our articles and guides about ${category.name}. Bedroom styling, decor, and inspiration from ${siteName}.`;

  return {
    title: category.name,
    description,
    openGraph: {
      title: category.name,
      description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: dbCategories } = await getCategories();
  const dbCategory = (dbCategories ?? []).find((c) => c.slug === slug);

  if (!dbCategory) {
    notFound();
  }

  const { data: dbPosts } = await getPostsByCategory(slug);
  const posts = dbPosts ?? [];

  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-6 text-center">
          {dbCategory.name}
        </h1>
      </SectionContainer>

      <SectionContainer variant="default">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#5A4A3A] text-lg">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
