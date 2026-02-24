import Link from "next/link";

export default function AffiliateCallout() {
  return (
    <p className="text-sm text-[#8B7355] my-6 py-4 border-y border-[#D4C4B0]/30">
      Some links in this article are affiliate links. If you make a purchase
      through them, we may earn a small commission at no extra cost to you.{" "}
      <Link href="/affiliate-disclosure" className="link font-medium">
        Full disclosure
      </Link>
      .
    </p>
  );
}
