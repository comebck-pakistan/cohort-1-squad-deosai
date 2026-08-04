import type { ReactNode } from "react";

export type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M3 12l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    href: "/dashboard/setup",
    label: "Setup",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <circle cx="12" cy="12" r="3.2" />
      </svg>
    ),
  },
  {
    href: "/dashboard/inbox",
    label: "Inbox",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M5 5h14v10H8l-3 3z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M9 15h6" />
      </svg>
    ),
  },

  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <circle cx="12" cy="12" r="3" />
        <path d="M4.5 12a7.5 7.5 0 0 0 .1 1.3l-1.4 1.1 1.5 2.6 1.7-.6a7.5 7.5 0 0 0 2.2 1.3l.3 1.8h3l.3-1.8a7.5 7.5 0 0 0 2.2-1.3l1.7.6 1.5-2.6-1.4-1.1a7.5 7.5 0 0 0 0-2.6l1.4-1.1-1.5-2.6-1.7.6a7.5 7.5 0 0 0-2.2-1.3L13.5 3h-3l-.3 1.8a7.5 7.5 0 0 0-2.2 1.3l-1.7-.6-1.5 2.6 1.4 1.1a7.5 7.5 0 0 0-.1 1.3z" />
      </svg>
    ),
  },
];
