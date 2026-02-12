import { Metadata } from "next";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Affiliate disclosure for Room Reset Style website.",
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
              Room Reset Style participates in various affiliate marketing
              programs, which means we may earn commissions on purchases made
              through our links to retailer sites. This includes, but is not
              limited to, the Amazon Associates program.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              How Affiliate Links Work
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              When you click on an affiliate link on our website and make a
              purchase, we may receive a small commission at no additional cost
              to you. These commissions help support the operation of Room Reset
              Style and allow us to continue providing free content and
              recommendations.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Our Recommendations
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Our product recommendations are based on our research, expertise,
              and genuine belief in the products we feature. We only recommend
              products that we believe will be valuable to our readers,
              regardless of affiliate relationships. The presence of an
              affiliate link does not influence our editorial content or product
              selection.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Transparency
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              We are committed to transparency and will always disclose when we
              use affiliate links. You can identify affiliate links by looking
              for disclosure notices on product pages or within article content.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Your Support
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              When you make a purchase through our affiliate links, you&apos;re
              supporting Room Reset Style at no extra cost to you. We appreciate
              your support, which helps us continue creating valuable content
              about bedroom styling and product recommendations.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Questions
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              If you have any questions about our affiliate relationships or
              this disclosure, please feel free to contact us through our
              website.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
