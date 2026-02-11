import Button from "./ui/Button";
import Input from "./ui/Input";
import Card from "./ui/Card";

export default function NewsletterSection() {
  return (
    <Card className="bg-gradient-to-br from-[#F5F3F0] to-[#FAF8F6] border-2 border-[#D4C4B0]/30">
      <div className="max-w-2xl mx-auto px-8 py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mb-4">
          Stay Updated
        </h2>
        <p className="text-[#5A4A3A] mb-8 text-lg leading-relaxed">
          Get the latest bedroom styling tips and product recommendations
          delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button size="lg" className="whitespace-nowrap">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-[#8B7355] mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </Card>
  );
}
