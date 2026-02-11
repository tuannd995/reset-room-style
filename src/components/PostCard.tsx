import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

interface PostCardProps {
  post: Post;
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

export default function PostCard({ post }: PostCardProps) {
  const imageUrl =
    postImages[post.slug] ||
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070";
  const categoryName = post.category
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Link href={`/${post.slug}`} className="block h-full no-underline">
      <Card className="h-full flex flex-col overflow-hidden group">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <Badge>{categoryName}</Badge>
          </div>
          <h2 className="text-xl font-serif font-semibold text-[#2C2416] mb-3 group-hover:text-[#8B7355] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-[#5A4A3A] text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-[#8B7355] mt-auto pt-4 border-t border-[#D4C4B0]/30">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
