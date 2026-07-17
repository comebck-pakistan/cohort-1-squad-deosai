"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { IconMenu, IconX } from "@/components/marketing/icons";
import { cn } from "@/lib/utils";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#why", label: "Why Deosai" },
  { href: "#proof", label: "Proof" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "solid" = white bar (scrolled or mobile menu open); otherwise transparent over the green hero
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-hairline bg-snow/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-6xl items-center gap-6 px-5">
        <Link href="/" aria-label="Deosai home" onClick={() => setOpen(false)}>
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "cursor-pointer text-[15px] font-medium tracking-[-0.01em] transition-colors",
                solid
                  ? "text-slate hover:text-coal"
                  : "text-white/80 hover:text-white"
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href="/auth/login"
            className={cn(
              "hidden cursor-pointer rounded-full px-3.5 py-2 text-sm font-semibold transition-colors sm:block",
              solid
                ? "text-coal hover:text-green-deep"
                : "text-white/85 hover:text-white"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className={cn(
              "inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors",
              solid
                ? "bg-green text-snow hover:bg-green-deep"
                : "bg-white text-forest hover:bg-primary-50"
            )}
          >
            Start free
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors lg:hidden",
              solid
                ? "border-hairline text-coal hover:bg-mist"
                : "border-white/30 text-white hover:bg-white/10"
            )}
          >
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open ? (
        <div className="border-t border-hairline bg-snow px-5 py-3 lg:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-slate transition-colors hover:bg-mist hover:text-coal"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-coal hover:text-green-deep sm:hidden"
            >
              Sign in
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
