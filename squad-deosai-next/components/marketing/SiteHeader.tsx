import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "#product", label: "Product" },
  { href: "#benefits", label: "Benefits" },
  { href: "#metrics", label: "Metrics" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-strong/60 bg-paper/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5">
        <Link href="/" aria-label="Deosai home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-teal-soft hover:text-teal"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-full px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-teal"
          >
            Sign in
          </Link>
          <ButtonLink href="/auth/signup" size="sm" className="bg-teal text-paper hover:bg-teal-bright">
            Start free
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
