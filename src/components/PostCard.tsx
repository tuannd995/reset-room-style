import Link from "next/link";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import DbImage from "./ui/DbImage";
import type { PostWithCategory } from "@/lib";

interface PostCardProps {
  post: PostWithCategory;
}

function readTimeMinutes(content: string): number {
  const words = content ? content.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 220));
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/${post.slug}`} className="block h-full no-underline">
      <Card className="h-full flex flex-col overflow-hidden group">
        <div className="aspect-video relative overflow-hidden">
          <DbImage
            src={post.featured_image || undefined}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <Badge>{post.category.name}</Badge>
          </div>
          <h2 className="text-xl font-serif font-semibold text-[#2C2416] mb-3 group-hover:text-[#8B7355] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-[#5A4A3A] text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-[#8B7355] mt-auto pt-4 border-t border-[#D4C4B0]/30">
            <span>
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : null}
            </span>
            <span>{readTimeMinutes(post.content)} min read</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
