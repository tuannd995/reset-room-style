import { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import PostCard from "@/components/PostCard";
import NewsletterSection from "@/components/NewsletterSection";
import SectionContainer from "@/components/ui/SectionContainer";
import { categories, posts, products } from "@/data/mockData";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover cozy bedroom styling tips, curated product recommendations, and inspiration to transform your space into a peaceful sanctuary.",
};

const productImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2070",
  "2": "https://images.unsplash.com/photo-1616628188467-8c1cbfe0c8a3?q=80&w=2070",
  "3": "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070",
};

export default function Home() {
  const latestPosts = posts.slice(0, 6);
  const featuredProducts = products.slice(0, 3);

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
            <CategoryCard key={category.slug} category={category} />
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
            <PostCard key={post.slug} post={post} />
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
                <Image
                  src={
                    productImages[product.id] ||
                    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070"
                  }
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
                  {product.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {product.benefits.slice(0, 3).map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-[#5A4A3A]"
                    >
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
                      {benefit}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#2C2416] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8B7355] transition-all duration-300 hover:scale-105">
                  View on Amazon
                </button>
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
