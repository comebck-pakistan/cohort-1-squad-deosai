"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#product", label: "Product" },
  { href: "#benefits", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let previous = window.scrollY > 16;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const next = window.scrollY > 16;
        if (next !== previous) {
          previous = next;
          setScrolled(next);
        }
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5 font-landing">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pr-2 pl-5 transition-all duration-300",
          scrolled
            ? "border-line bg-white/85 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Link href="/" aria-label="Deosai home">
          <Logo />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-teal-soft hover:text-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Link
            href="/auth/login"
            className="hidden rounded-full px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:text-teal sm:inline-flex"
          >
            Sign in
          </Link>
          <ButtonLink href="/auth/signup" size="sm" className="bg-teal text-paper hover:bg-teal-bright">
            Start free
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
