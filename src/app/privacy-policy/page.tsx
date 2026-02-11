import { Metadata } from "next";
import SectionContainer from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Room Reset Style website.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F6]">
      <SectionContainer variant="gradient">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2C2416] mb-8 text-center">
            Privacy Policy
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
              Introduction
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              Room Reset Style ("we," "our," or "us") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Information We Collect
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg mb-4">
              We may collect information about you in various ways:
            </p>
            <ul className="list-disc space-y-3 ml-6 text-[#5A4A3A] text-lg leading-relaxed">
              <li>
                <strong className="text-[#2C2416]">Personal Data:</strong>{" "}
                Information you voluntarily provide, such as email addresses
                when subscribing to newsletters
              </li>
              <li>
                <strong className="text-[#2C2416]">Usage Data:</strong>{" "}
                Information automatically collected, including IP addresses,
                browser type, and pages visited
              </li>
              <li>
                <strong className="text-[#2C2416]">Cookies:</strong> Small data
                files stored on your device to enhance your browsing experience
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              How We Use Your Information
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc space-y-3 ml-6 text-[#5A4A3A] text-lg leading-relaxed">
              <li>Provide and maintain our website</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Improve our website and user experience</li>
              <li>Analyze usage patterns and trends</li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Third-Party Services
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              We may use third-party services that collect information used to
              identify you. These services have their own privacy policies
              addressing how they use such information.
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Your Rights
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg mb-4">
              You have the right to:
            </p>
            <ul className="list-disc space-y-3 ml-6 text-[#5A4A3A] text-lg leading-relaxed">
              <li>Access and receive a copy of your personal data</li>
              <li>Request correction of inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-12 mb-6 pt-8 border-t border-[#D4C4B0]/30">
              Contact Us
            </h2>
            <p className="text-[#5A4A3A] leading-relaxed text-lg">
              If you have questions about this Privacy Policy, please contact us
              through our website.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
