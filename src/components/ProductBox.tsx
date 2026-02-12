import Card from "./ui/Card";
import Button from "./ui/Button";
import DbImage from "./ui/DbImage";
import { Product } from "@/types";

interface ProductBoxProps {
  product: Product;
}

export default function ProductBox({ product }: ProductBoxProps) {
  return (
    <Card className="my-12 border-2 border-[#D4C4B0]/30">
      <div className="flex flex-col md:flex-row gap-8 p-8">
        <div className="md:w-1/3">
          <div className="aspect-square rounded-xl overflow-hidden bg-[#F5F3F0] relative">
            <DbImage
              src={product.image || undefined}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <h3 className="text-2xl font-serif font-semibold text-[#2C2416] mb-3">
            {product.name}
          </h3>
          <p className="text-[#5A4A3A] mb-6 leading-relaxed">
            {product.description}
          </p>
          {product.benefits?.length > 0 && (
            <ul className="space-y-3 mb-8">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#8B7355] mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#5A4A3A] leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto">
            <Button size="lg" className="w-full md:w-auto">
              View on Amazon
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
