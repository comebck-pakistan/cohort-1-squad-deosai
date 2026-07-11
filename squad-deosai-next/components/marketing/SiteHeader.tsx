import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "#problem", label: "The problem" },
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Proof" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link href="/" aria-label="Deosai home">
          <Logo />
        </Link>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-teal-soft hover:text-teal"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href="/auth/login"
            className="rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-teal"
          >
            Sign in
          </Link>
          <ButtonLink href="/auth/signup" size="sm">
            Start free
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
