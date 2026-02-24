import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib";
import DbImage from "@/components/ui/DbImage";
import SectionContainer from "@/components/ui/SectionContainer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getSupabase } = await import("@/lib");
  const { data } = await getSupabase().from("products").select("slug");
  const rows = (data ?? []) as { slug: string }[];
  return rows.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: product } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryName = product.category?.name;
  const categorySlug = product.category?.slug;
  const hasAmazonLink = !!product.amazon_link?.trim();

  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {categorySlug && (
            <Link
              href={`/category/${categorySlug}`}
              className="link inline-block mb-6 text-[#8B7355] hover:text-[#2C2416] transition-colors duration-300 font-medium"
            >
              ← Back to {categoryName}
            </Link>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-6 leading-tight">
            {product.name}
          </h1>
        </div>
      </SectionContainer>

      <SectionContainer variant="default">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-[#F5F3F0]">
                <DbImage
                  src={product.image || undefined}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col">
                {product.category && (
                  <p className="text-sm text-[#8B7355] font-medium mb-2">
                    {product.category.name}
                  </p>
                )}
                <p className="text-[#5A4A3A] text-lg leading-relaxed mb-8">
                  {product.short_description}
                </p>
                {product.rating != null && (
                  <p className="text-[#5A4A3A] text-sm mb-6">
                    Rating: {product.rating}/5
                  </p>
                )}
                {hasAmazonLink ? (
                  <a
                    href={product.amazon_link!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 rounded-lg bg-[#FF9900] text-[#232F3E] font-semibold hover:bg-[#E88B00] transition-colors duration-300"
                  >
                    Explore on Amazon
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : (
                  <p className="text-[#8B7355] text-sm">
                    Amazon link not available for this product.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
