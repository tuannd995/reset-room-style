import Link from "next/link";
import type { Category } from "@/lib";

const linkClass =
  "link text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300 font-medium";

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F6]/80 backdrop-blur-md border-b border-[#D4C4B0]/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-3xl font-serif font-semibold text-[#2C2416] hover:text-[#8B7355] transition-colors duration-300"
          >
            Room Reset Style
          </Link>
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className={linkClass}>
              Home
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={linkClass}
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/about" className={linkClass}>
              About
            </Link>
          </nav>
          <button className="md:hidden p-2 text-[#5A4A3A] hover:text-[#2C2416] transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
