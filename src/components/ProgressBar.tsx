"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset and start progress on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setProgress(10);

    // Simulate progress with realistic increments
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 70) {
          clearInterval(progressInterval);
          return 70;
        }
        // Slow down as we progress
        const increment = prev < 30 ? 15 : prev < 50 ? 10 : 5;
        return Math.min(prev + increment, 70);
      });
    }, 100);

    // Complete progress when route change is done
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-100 h-1 bg-[#D4C4B0]/20 transition-opacity duration-300 ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full bg-linear-to-r from-[#8B7355] via-[#D4C4B0] to-[#8B7355] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px rgba(139, 115, 85, 0.4)",
        }}
      />
    </div>
  );
}
