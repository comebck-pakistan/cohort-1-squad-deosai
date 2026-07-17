import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "green"
  | "dark"
  | "accent"
  | "white"
  | "outline"
  | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full transition-colors transition-transform duration-150 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-green text-snow hover:bg-green-deep shadow-[0_14px_34px_-16px_rgba(18,45,39,0.75)]",
  green:
    "bg-green text-snow hover:bg-green-deep shadow-[0_14px_34px_-16px_rgba(18,45,39,0.75)]",
  dark: "bg-forest text-snow hover:bg-forest-2",
  accent: "bg-green text-snow hover:bg-green-deep",
  white: "bg-white text-forest hover:bg-primary-50",
  outline:
    "border border-hairline bg-transparent text-coal hover:border-green hover:text-green-deep",
  ghost: "bg-transparent text-coal hover:bg-green-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 h-9",
  md: "text-sm px-5 h-11",
  lg: "text-base px-7 h-13",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
