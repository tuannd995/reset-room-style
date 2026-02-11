import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  const input = (
    <input
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-neutral-300",
        "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent",
        "transition-all duration-300 ease-in-out",
        "placeholder:text-neutral-400",
        className
      )}
      {...props}
    />
  );

  if (label) {
    return (
      <label className="block">
        <span className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </span>
        {input}
      </label>
    );
  }

  return input;
}
