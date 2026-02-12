import { Metadata } from "next";
import Link from "next/link";
import { getPostsPaginated } from "@/lib";
import { siteDescription } from "@/lib/site";
import PostCard from "@/components/PostCard";
import SectionContainer from "@/components/ui/SectionContainer";

const PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Articles",
  description:
    siteDescription ||
    "All articles on bedroom styling, decor, lighting, bedding, and storage ideas.",
  openGraph: {
    title: "Articles",
    description:
      siteDescription ||
      "All articles on bedroom styling, decor, lighting, bedding, and storage ideas.",
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const offset = (page - 1) * PER_PAGE;

  const {
    data: posts,
    total,
    error,
  } = await getPostsPaginated(PER_PAGE, offset);

  const totalPages = Math.ceil(total / PER_PAGE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  if (error) {
    return (
      <SectionContainer variant="default">
        <p className="text-[#5A4A3A] text-center">Unable to load articles.</p>
      </SectionContainer>
    );
  }

  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-4 text-center">
          Articles
        </h1>
        <p className="text-xl text-[#5A4A3A] max-w-2xl mx-auto text-center">
          All our guides and inspiration for your bedroom.
        </p>
      </SectionContainer>

      <SectionContainer variant="default">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="mt-16 flex items-center justify-center gap-4"
                aria-label="Articles pagination"
              >
                {hasPrev ? (
                  <Link
                    href={
                      page === 2 ? "/articles" : `/articles?page=${page - 1}`
                    }
                    className="px-5 py-2.5 rounded-lg bg-[#2C2416] text-white font-medium hover:bg-[#8B7355] transition-colors"
                  >
                    Previous
                  </Link>
                ) : (
                  <span
                    className="px-5 py-2.5 rounded-lg bg-[#D4C4B0]/50 text-[#5A4A3A] cursor-not-allowed"
                    aria-disabled
                  >
                    Previous
                  </span>
                )}
                <span className="text-[#5A4A3A] font-medium">
                  Page {page} of {totalPages}
                </span>
                {hasNext ? (
                  <Link
                    href={`/articles?page=${page + 1}`}
                    className="px-5 py-2.5 rounded-lg bg-[#2C2416] text-white font-medium hover:bg-[#8B7355] transition-colors"
                  >
                    Next
                  </Link>
                ) : (
                  <span
                    className="px-5 py-2.5 rounded-lg bg-[#D4C4B0]/50 text-[#5A4A3A] cursor-not-allowed"
                    aria-disabled
                  >
                    Next
                  </span>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#5A4A3A] text-lg">
              No articles yet. Check back soon.
            </p>
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
