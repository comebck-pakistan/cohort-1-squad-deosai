"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#product", label: "Product" },
  { href: "#benefits", label: "Benefits" },
  { href: "#metrics", label: "Metrics" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-paper/85 backdrop-blur-xl border-surface-strong/60 shadow-sm py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <Link href="/" aria-label="Deosai home" className="hover-glow rounded-xl p-1">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-medium text-ink-soft transition-colors hover:text-teal pb-1"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-ink transition-colors hover:text-teal"
          >
            Sign in
          </Link>
          <ButtonLink href="/auth/signup" size="sm" className="bg-teal text-paper hover:bg-teal-bright hover-glow">
            Start free
          </ButtonLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-ink"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-paper/95 backdrop-blur-xl border-b border-surface-strong/60 shadow-lg px-5 py-4 flex flex-col gap-4 slide-down">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-medium text-ink hover:text-teal p-2 rounded-lg hover:bg-teal-soft"
              onClick={() => setMobileMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <hr className="border-line" />
          <Link
            href="/auth/login"
            className="text-base font-medium text-ink p-2"
          >
            Sign in
          </Link>
          <ButtonLink href="/auth/signup" size="md" className="w-full mt-2">
            Start free
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
