import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: "default" | "light" | "gradient";
}

export default function SectionContainer({
  children,
  className,
  variant = "default",
  ...props
}: SectionContainerProps) {
  const variants = {
    default: "bg-white",
    light: "bg-neutral-50",
    gradient: "bg-gradient-to-br from-neutral-50 to-neutral-100",
  };

  return (
    <section
      className={cn("py-16 md:py-24", variants[variant], className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
