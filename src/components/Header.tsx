"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib";

const linkClass =
  "link text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300 font-medium";

const mobileLinkClass =
  "link block py-3 text-[#5A4A3A] hover:text-[#2C2416] font-medium text-lg border-b border-[#D4C4B0]/30 last:border-0";

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F6]/80 backdrop-blur-md border-b border-[#D4C4B0]/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-3xl font-serif font-semibold text-[#2C2416] hover:text-[#8B7355] transition-colors duration-300"
          >
            Reset Homestyle
          </Link>
          <nav className="hidden lg:flex items-center space-x-10">
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
            <Link href="/products" className={linkClass}>
              Products
            </Link>
            <Link href="/about" className={linkClass}>
              About
            </Link>
          </nav>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="lg:hidden p-2 text-[#5A4A3A] hover:text-[#2C2416] transition-colors rounded-lg hover:bg-[#D4C4B0]/20"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav
          className="bg-[#FAF8F6] border-t border-[#D4C4B0]/30 px-4 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-0">
            <li>
              <Link
                href="/"
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products"
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
