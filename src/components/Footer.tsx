import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F5F3F0] border-t border-[#D4C4B0]/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-semibold text-[#2C2416] mb-4">
              Room Reset Style
            </h3>
            <p className="text-[#5A4A3A] mb-4 max-w-md leading-relaxed">
              Your guide to creating the perfect bedroom sanctuary. Discover
              cozy styling tips, product recommendations, and inspiration for
              transforming your space.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#2C2416] mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/bedroom-lighting"
                  className="text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300"
                >
                  Bedroom Lighting
                </Link>
              </li>
              <li>
                <Link
                  href="/category/bedding"
                  className="text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300"
                >
                  Bedding
                </Link>
              </li>
              <li>
                <Link
                  href="/category/small-bedroom"
                  className="text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300"
                >
                  Small Bedroom
                </Link>
              </li>
              <li>
                <Link
                  href="/category/storage"
                  className="text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300"
                >
                  Storage
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#2C2416] mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="text-[#5A4A3A] hover:text-[#2C2416] transition-colors duration-300"
                >
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#D4C4B0]/30 text-center text-[#8B7355]">
          <p>
            &copy; {new Date().getFullYear()} Room Reset Style. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
