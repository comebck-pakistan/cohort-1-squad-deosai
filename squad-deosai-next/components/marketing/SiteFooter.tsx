import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            The WhatsApp assistant that keeps your shop replying — even while
            you sleep.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-ink-soft sm:text-right">
          <Link href="/auth/signup" className="hover:text-teal">
            Start free
          </Link>
          <Link href="/dashboard" className="hover:text-teal">
            Seller dashboard
          </Link>
          <span className="font-mono text-xs text-ink-faint">
            Squad Deosai · Comebck Pakistan — Cohort 1
          </span>
        </div>
      </div>
    </footer>
  );
}
