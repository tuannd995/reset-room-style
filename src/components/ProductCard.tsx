import Link from "next/link";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import DbImage from "./ui/DbImage";
import type { ProductWithCategory } from "@/lib";

interface ProductCardProps {
  product: ProductWithCategory;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasAmazonLink = !!product.amazon_link?.trim();

  return (
    <Card className="h-full flex flex-col overflow-hidden group">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="aspect-square relative overflow-hidden">
          <DbImage
            src={product.image || undefined}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          {product.category && (
            <div className="mb-3">
              <Badge>{product.category.name}</Badge>
            </div>
          )}
          <h2 className="text-xl font-serif font-semibold text-[#2C2416] mb-3 group-hover:text-[#8B7355] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h2>
          <p className="text-[#5A4A3A] text-sm line-clamp-3 flex-1 leading-relaxed">
            {product.short_description}
          </p>
        </div>
      </Link>
      <div className="p-6 pt-0">
        {hasAmazonLink ? (
          <a
            href={product.amazon_link!}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#2C2416] text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-[#8B7355] transition-all duration-300"
          >
            Explore on Amazon
          </a>
        ) : (
          <Link
            href={`/products/${product.slug}`}
            className="block w-full bg-[#2C2416] text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-[#8B7355] transition-all duration-300"
          >
            View details
          </Link>
        )}
      </div>
    </Card>
  );
}
