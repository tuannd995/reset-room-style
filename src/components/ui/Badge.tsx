import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "outline";
}

export default function Badge({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    outline: "border border-neutral-300 text-neutral-700 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium rounded-full",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
