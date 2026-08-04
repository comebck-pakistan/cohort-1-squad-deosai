"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Logo } from "@/components/ui/Logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
        .from("[data-auth='brand']", { y: -20, opacity: 0 })
        .from("[data-auth='header']", { y: 20, opacity: 0 }, "-=0.5")
        .from("[data-auth='panel']", { y: 32, opacity: 0 }, "-=0.6")
        .from("[data-auth='footer']", { y: 15, opacity: 0 }, "-=0.5");
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={scope} className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-paper px-5 py-16 font-landing">
      {/* Decorative background grid & blurs */}
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent-soft blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-teal-soft blur-3xl opacity-50"
      />

      <div className="relative z-10 w-full max-w-md space-y-8 flex flex-col items-center">
        {/* Logo and Brand */}
        <div data-auth="brand" className="flex flex-col items-center">
          <Link href="/" aria-label="Back to home">
            <Logo />
          </Link>
        </div>

        {/* Centered card content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
