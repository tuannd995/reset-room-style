import { Metadata } from "next";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Affiliate disclosure for Reset Homestyle. How we use affiliate links and our commitment to transparent, research-based recommendations for small home office products.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-8 text-center">
            Affiliate Disclosure
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <p className="text-[#8B7355] text-sm mb-8">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Affiliate Relationships
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Reset Homestyle participates in affiliate marketing programs,
              including the Amazon Associates program. When you click certain
              links on our site and make a purchase, we may earn a small
              commission at no additional cost to you.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              How This Supports Our Work
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Commissions help us run Reset Homestyle and continue providing
              free guides on small home office solutions — from space-saving
              desks and ergonomic chairs to layout ideas and productivity
              setups. We only recommend products we believe are useful for
              compact workspaces.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Our Recommendations
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Our recommendations are based on research, dimensions, and
              real-world use. Affiliate relationships do not influence which
              products we feature or how we review them. The presence of an
              affiliate link does not change our editorial content or product
              selection.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Transparency
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              We disclose affiliate links in articles and on product sections.
              When you make a purchase through our links, you support Reset
              Homestyle at no extra cost to you. If you have questions about
              this disclosure, you can reach us through our website.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
