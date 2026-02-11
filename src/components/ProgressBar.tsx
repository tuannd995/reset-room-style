"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100,
      minimum: 0.08,
      easing: "ease",
      speed: 400,
    });

    // Start progress on route change
    NProgress.start();

    // Complete progress after navigation completes
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
