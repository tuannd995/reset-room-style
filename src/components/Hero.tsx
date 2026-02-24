import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import { siteSlogan, siteDescription } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
          alt="Compact home office workspace"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#FAF8F6]/95 via-[#FAF8F6]/85 to-[#FAF8F6]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2C2416] mb-8 leading-[1.1] tracking-tight">
            {siteSlogan}
          </h1>
          <p className="text-xl md:text-2xl text-[#5A4A3A] mb-10 leading-relaxed max-w-2xl">
            {siteDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/articles">
              <Button size="lg" className="shadow-xl">
                Explore Guides
              </Button>
            </Link>
            <Link
              href="/category/desks"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-[#2C2416] text-[#2C2416] hover:bg-[#2C2416] hover:text-white! transition-colors duration-300"
            >
              Browse Desks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
