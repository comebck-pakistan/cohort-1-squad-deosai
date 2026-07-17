import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { IconInstagram, IconWhatsApp, IconMessenger } from "@/components/marketing/icons";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Why Deosai", href: "#why" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "For sellers",
    links: [
      { label: "Start free", href: "/auth/signup" },
      { label: "Sign in", href: "/auth/login" },
      { label: "Seller dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Your data", href: "#proof" },
      { label: "Proof", href: "#proof" },
      { label: "Contact us", href: "/auth/signup" },
    ],
  },
];

const socials = [
  { icon: IconInstagram, label: "Instagram", href: "#" },
  { icon: IconWhatsApp, label: "WhatsApp", href: "#" },
  { icon: IconMessenger, label: "Messenger", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-snow">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
              The WhatsApp assistant that keeps your shop replying — even while
              you sleep.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-slate transition-colors hover:border-green hover:text-green-deep"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-faint">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate transition-colors hover:text-coal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-sm text-slate-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs">
            © {new Date().getFullYear()} Squad Deosai · Comebck Pakistan — Cohort 1
          </span>
          <span>Built with 15 Pakistani sellers · fashion &amp; jewellery</span>
        </div>
      </div>
    </footer>
  );
}
