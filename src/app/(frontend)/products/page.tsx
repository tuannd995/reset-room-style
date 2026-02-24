import { Metadata } from "next";
import { getProducts } from "@/lib";
import ProductCard from "@/components/ProductCard";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Curated products for small home offices: space-saving desks, ergonomic chairs, and smart accessories. Explore our recommendations.",
};

export default async function ProductsPage() {
  const { data: products, error } = await getProducts();

  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-4 text-center">
          Products
        </h1>
        <p className="text-xl text-[#5A4A3A] max-w-2xl mx-auto text-center">
          Space-saving desks, ergonomic chairs, and accessories we recommend for
          small home offices.
        </p>
      </SectionContainer>

      <SectionContainer variant="default">
        {error ? (
          <p className="text-[#5A4A3A] text-center">
            Unable to load products. Please try again later.
          </p>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#5A4A3A] text-lg">
              No products yet. Check back soon.
            </p>
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
