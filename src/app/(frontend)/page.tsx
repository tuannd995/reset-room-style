import { Metadata } from "next";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import PostCard from "@/components/PostCard";
import NewsletterSection from "@/components/NewsletterSection";
import SectionContainer from "@/components/ui/SectionContainer";
import DbImage from "@/components/ui/DbImage";
import { getCategories, getLatestPosts, getProductsByCategory } from "@/lib";
import type { ProductWithCategory } from "@/lib";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover cozy bedroom styling tips, curated product recommendations, and inspiration to transform your space into a peaceful sanctuary.",
};

export default async function Home() {
  const [{ data: dbCategories }, { data: dbPosts }, { data: dbProducts }] =
    await Promise.all([
      getCategories(),
      getLatestPosts(6),
      getProductsByCategory("bedding", 3, 0),
    ]);

  const categories = dbCategories ?? [];
  const latestPosts = dbPosts ?? [];
  const featuredProducts: ProductWithCategory[] = dbProducts ?? [];

  return (
    <div>
      <Hero />

      {/* Category Grid */}
      <SectionContainer variant="default">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#2C2416] mb-12 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </SectionContainer>

      {/* Latest Articles */}
      <SectionContainer variant="light">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#2C2416] mb-12 text-center">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </SectionContainer>

      {/* Featured Products */}
      <SectionContainer variant="default">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#2C2416] mb-12 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="aspect-square relative overflow-hidden">
                <DbImage
                  src={product.image || undefined}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-[#2C2416] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#5A4A3A] text-sm mb-4 leading-relaxed">
                  {product.short_description}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm text-[#5A4A3A]">
                    <svg
                      className="w-4 h-4 text-[#8B7355] mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {product.short_description}
                  </li>
                </ul>
                <a
                  href={product.amazon_link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#2C2416] text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-[#8B7355] transition-all duration-300 hover:scale-105"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Newsletter */}
      <SectionContainer variant="gradient">
        <NewsletterSection />
      </SectionContainer>
    </div>
  );
}
