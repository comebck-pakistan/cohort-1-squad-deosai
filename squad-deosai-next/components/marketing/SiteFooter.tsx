import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="rounded-[2rem] border border-line bg-card p-8 shadow-2xl glass-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Logo />
              <p className="mt-4 max-w-md text-sm text-ink-soft">
                Industrial SaaS built for teams that need operational clarity, reliable automation, and a stunning command center.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup" className="rounded-full border border-line bg-white/90 px-4 py-2 text-sm font-medium text-teal transition hover:bg-teal-soft">
                Start free
              </Link>
              <Link href="/dashboard" className="rounded-full border border-line bg-transparent px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface-soft hover:text-teal">
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-ink-soft">
          <p className="font-semibold text-ink">Need help?</p>
          <div className="space-y-2">
            <Link href="/support" className="block hover:text-teal">
              Support center
            </Link>
            <Link href="/dashboard/settings" className="block hover:text-teal">
              Product settings
            </Link>
            <Link href="/auth/login" className="block hover:text-teal">
              Sign in
            </Link>
          </div>
          <p className="pt-4 text-xs text-ink-faint">Squad Deosai · Cohort 1 · Crafted for high-impact operations.</p>
        </div>
      </div>
    </footer>
  );
}
