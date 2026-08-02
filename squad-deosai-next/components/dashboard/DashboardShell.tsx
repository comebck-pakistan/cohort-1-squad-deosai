"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/ui/Logo";
import { Pulse } from "@/components/ui/Pulse";
import { navItems } from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper">
        <Pulse label="loading your shop" />
      </div>
    );
  }

  // Layout-level auth guard
  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/auth/login";
    return null;
  }

  // Force onboarding if not completed
  if (!user.onboarded && pathname !== "/onboarding") {
    if (typeof window !== "undefined") window.location.href = "/onboarding";
    return null;
  }

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const navList = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(item.href)
              ? "bg-teal text-paper"
              : "text-ink-soft hover:bg-teal-soft hover:text-teal"
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-paper">
      {/* desktop sidebar */}
      <aside className="hidden w-64 flex-none flex-col border-r border-line bg-card/95 p-4 glass-card lg:flex">
        <div className="px-2 py-2">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="mt-4 rounded-3xl border border-line bg-white/85 px-4 py-3 shadow-sm">
          <p className="truncate text-sm font-semibold text-ink">{user.businessName}</p>
          <Pulse label="connected" tone="live" className="mt-2" />
        </div>
        <div className="mt-6">{navList}</div>
        <button
          onClick={signOut}
          className="mt-auto rounded-3xl px-3 py-2.5 text-left text-sm text-ink-soft transition-colors hover:bg-paper-deep hover:text-danger"
        >
          Sign out
        </button>
      </aside>

      {/* mobile top bar */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-line bg-card/95 px-4 py-3 shadow-sm lg:hidden">
          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink"
          >
            <span className="sr-only">Menu</span>
            {mobileOpen ? "✕" : "☰"}
          </button>
          <Link href="/">
            <Logo />
          </Link>
          <span className="ml-auto">
            <Pulse tone="live" />
          </span>
        </div>

        {mobileOpen ? (
          <div className="border-b border-line bg-card/95 px-4 py-3 lg:hidden">
            {navList}
            <button
              onClick={signOut}
              className="mt-2 w-full rounded-3xl px-3 py-2.5 text-left text-sm text-ink-soft hover:text-danger"
            >
              Sign out
            </button>
          </div>
        ) : null}

        <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
