import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import Card from "./ui/Card";

const categoryImages: Record<string, string> = {
  "bedroom-lighting":
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070",
  bedding:
    "https://images.unsplash.com/photo-1631889993954-3b055f447d3a?q=80&w=2070",
  "small-bedroom":
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070",
  storage:
    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070",
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl =
    categoryImages[category.slug] ||
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070";

  return (
    <Link href={`/category/${category.slug}`} className="block h-full">
      <Card className="h-full overflow-hidden group">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C2416]/60 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold text-[#2C2416] mb-2 group-hover:text-[#8B7355] transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-[#5A4A3A] text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
