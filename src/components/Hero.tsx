import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import { siteName, siteSlogan, siteDescription } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070"
          alt="Cozy bedroom with warm lighting"
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
            {siteName}
            <br />
            <span className="text-[#8B7355]">{siteSlogan}</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#5A4A3A] mb-10 leading-relaxed max-w-2xl">
            {siteDescription}
          </p>
          <Link href="/articles">
            <Button size="lg" className="shadow-xl">
              View Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
