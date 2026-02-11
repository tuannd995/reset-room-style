import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-md transition-all duration-300 ease-in-out",
        hover && "hover:shadow-xl hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
