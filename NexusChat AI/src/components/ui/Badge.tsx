import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error" | "ai" | "whatsapp";
}

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-blue-500/10 text-blue-400",
    secondary: "border-transparent bg-gray-800 text-gray-300",
    outline: "text-gray-300 border-gray-700",
    success: "border-transparent bg-emerald-500/10 text-emerald-400",
    warning: "border-transparent bg-amber-500/10 text-amber-400",
    error: "border-transparent bg-red-500/10 text-red-400",
    ai: "border-transparent bg-violet-500/10 text-violet-400 border border-violet-500/20",
    whatsapp: "border-transparent bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge };
