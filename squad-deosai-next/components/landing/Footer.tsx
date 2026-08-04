"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  NewTwitterIcon,
  Linkedin02Icon,
} from "@hugeicons/core-free-icons";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@jawabai.pk", href: "mailto:hello@jawabai.pk" },
      { label: "Lahore, Pakistan", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-card font-landing">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              AI customer support built for Pakistani social sellers. Automate routine conversations while staying in control.
            </p>
          </div>

          <div className="flex gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-heading text-xs tracking-widest text-ink uppercase">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-teal"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-line my-8" aria-hidden />

        <div className="flex flex-col items-center justify-between gap-1.5 text-center text-xs text-ink-soft sm:flex-row sm:gap-3">
          <p>© 2026 Jawab AI. All rights reserved.</p>
          <span className="hidden sm:inline text-ink-faint">•</span>
          <p className="text-ink-faint">Squad Deosai · Cohort 1 · Built for social commerce growth.</p>
        </div>
      </div>
    </footer>
  );
}
