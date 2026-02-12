import Link from "next/link";
import Card from "./ui/Card";
import DbImage from "./ui/DbImage";
import type { Category } from "@/lib";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="block h-full no-underline"
    >
      <Card className="h-full overflow-hidden group">
        <div className="aspect-[4/3] relative overflow-hidden">
          <DbImage
            src={category.image ?? undefined}
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
        </div>
      </Card>
    </Link>
  );
}
