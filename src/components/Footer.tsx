import Link from "next/link";
import type { Category } from "@/lib";

const linkClass =
  "link text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300";

interface FooterProps {
  categories: Category[];
}

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-[#F5F3F0] border-t border-[#D4C4B0]/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-semibold text-[#2C2416] mb-4">
              Reset Homestyle
            </h3>
            <p className="text-[#5A4A3A] mb-4 max-w-md leading-relaxed">
              A practical resource for optimizing small living spaces, with a
              focus on compact home office design. Space-saving desks, ergonomic
              chairs, and setup guides for productive workspaces.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#2C2416] mb-4">Categories</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className={linkClass}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#2C2416] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className={linkClass}>
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#D4C4B0]/30 text-center text-[#8B7355]">
          <p>
            &copy; {new Date().getFullYear()} Reset Homestyle. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
