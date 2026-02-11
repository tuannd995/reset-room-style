"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Start transition
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTransitioning(true);

    // Update content and finish transition
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isTransitioning
          ? "opacity-0 translate-y-2"
          : "opacity-100 translate-y-0"
      }`}
    >
      {displayChildren}
    </div>
  );
}
