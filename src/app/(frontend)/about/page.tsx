import { Metadata } from "next";
import Link from "next/link";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why Reset Homestyle focuses on small home office solutions. We help you design functional, productive workspaces in limited space with research-based recommendations.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-8 text-center">
            About Reset Homestyle
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Reset Homestyle is a practical resource focused on optimizing
              small living spaces, with a strong emphasis on compact home office
              design. We help you choose space-saving desks, ergonomic chairs,
              and smart accessories so you can build a productive workspace —
              even when square footage is limited.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Why We Focus on Small Home Offices
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              More people than ever work or study from home, but not everyone
              has a dedicated room for an office. Kitchens, corners of bedrooms,
              and alcoves are often the only space available. That creates a
              real problem: how do you stay productive and comfortable when your
              &quot;office&quot; has to share space with the rest of your life?
            </p>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              We shifted our focus to small home office solutions because we saw
              a need for clear, actionable guidance tailored to limited space.
              Generic desk and chair recommendations rarely consider size,
              layout, or cable management in tight areas. Our goal is to help
              you design a functional and productive small workspace without
              sacrificing comfort or style.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              What We Cover
            </h2>
            <ul className="list-disc space-y-3 ml-6 text-[#5A4A3A] text-lg leading-relaxed">
              <li>
                <strong className="text-[#2C2416]">Space-saving desks:</strong>{" "}
                Desks that fit small rooms, fold away, or double as other
                furniture
              </li>
              <li>
                <strong className="text-[#2C2416]">
                  Ergonomic chairs for small spaces:
                </strong>{" "}
                Supportive seating that doesn’t dominate the room
              </li>
              <li>
                <strong className="text-[#2C2416]">
                  Smart home office accessories:
                </strong>{" "}
                Lighting, cable management, and storage that keep your setup
                tidy and efficient
              </li>
              <li>
                <strong className="text-[#2C2416]">
                  Small workspace layout ideas:
                </strong>{" "}
                How to arrange your desk, monitor, and essentials in compact
                areas
              </li>
              <li>
                <strong className="text-[#2C2416]">
                  Productivity-focused setup guides:
                </strong>{" "}
                Practical steps to get the most out of a small home office
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Our Approach
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              We base our recommendations on research, user feedback, and
              real-world constraints. We look at dimensions, materials,
              adjustability, and value so you can make informed decisions. Our
              content is written to be helpful and practical — no fluff or
              filler. We aim to give you the information you need to choose the
              right products for your space and budget.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Transparency About Affiliate Partnerships
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Reset Homestyle participates in affiliate programs, including the
              Amazon Associates program. When you click certain links on our
              site and make a purchase, we may earn a small commission at no
              extra cost to you. These commissions help support our work and
              allow us to keep creating free guides and comparisons.
            </p>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Our recommendations are not influenced by affiliate relationships.
              We only recommend products we believe are genuinely useful for
              small home offices. For full details, please read our{" "}
              <Link href="/affiliate-disclosure" className="link font-medium">
                Affiliate Disclosure
              </Link>
              .
            </p>

            <p className="text-[#5A4A3A] leading-relaxed text-lg mt-8">
              Thank you for visiting Reset Homestyle. We’re here to help you
              make the most of your space — one practical guide at a time.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
