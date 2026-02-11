import { Metadata } from "next";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Room Reset Style and our mission to help you create the perfect bedroom sanctuary.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-8 text-center">
            About Room Reset Style
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Welcome to Room Reset Style, your trusted guide to creating the
              perfect bedroom sanctuary. We believe that your bedroom should be
              more than just a place to sleep—it should be a peaceful retreat
              where you can unwind, recharge, and reset.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Our Mission
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Our mission is to help you transform your bedroom into a space
              that reflects your personal style while promoting rest,
              relaxation, and well-being. We provide expert advice on bedroom
              styling, product recommendations, and practical tips to maximize
              both comfort and aesthetics.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              What We Cover
            </h2>
            <ul className="list-disc space-y-3 ml-6 text-[#5A4A3A] text-lg leading-relaxed">
              <li>
                <strong className="text-[#2C2416]">Bedroom Lighting:</strong>{" "}
                Creating the perfect ambiance with layered lighting solutions
              </li>
              <li>
                <strong className="text-[#2C2416]">Bedding Essentials:</strong>{" "}
                Finding the right materials and styles for ultimate comfort
              </li>
              <li>
                <strong className="text-[#2C2416]">
                  Small Bedroom Solutions:
                </strong>{" "}
                Maximizing space and style in compact rooms
              </li>
              <li>
                <strong className="text-[#2C2416]">Storage Ideas:</strong> Smart
                organization solutions for a clutter-free space
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Our Approach
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              We focus on practical, achievable solutions that work for real
              bedrooms. Whether you&apos;re working with a spacious master suite
              or a cozy studio apartment, we provide ideas and recommendations
              that can be adapted to your space and budget.
            </p>

            <p className="text-[#5A4A3A] leading-relaxed text-lg mt-8">
              Thank you for visiting Room Reset Style. We hope our content
              inspires you to create a bedroom that truly feels like home.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
