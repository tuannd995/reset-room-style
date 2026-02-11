import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, posts } from "@/data/mockData";
import PostCard from "@/components/PostCard";
import SectionContainer from "@/components/ui/SectionContainer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = posts.filter((post) => post.category === slug);

  return (
    <div className="bg-[#FAF8F6]">
      {/* Header */}
      <SectionContainer variant="gradient">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-6 text-center">
          {category.name}
        </h1>
        <p className="text-xl text-[#5A4A3A] max-w-3xl mx-auto text-center leading-relaxed">
          {category.description}
        </p>
      </SectionContainer>

      {/* Posts Grid */}
      <SectionContainer variant="default">
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
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
