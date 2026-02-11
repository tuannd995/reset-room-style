import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 hover:scale-105 focus:ring-neutral-900 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white hover:scale-105 focus:ring-neutral-900",
    ghost:
      "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-900",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
