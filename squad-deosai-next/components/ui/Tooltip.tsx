"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const TooltipContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ open: false, setOpen: () => {} });

export function TooltipProvider({
  children,
}: {
  children: React.ReactNode;
  delayDuration?: number;
}) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div
        className="relative inline-block w-full"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return <>{children}</>;
}

export function TooltipContent({
  children,
  className,
  side = "top",
}: {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}) {
  const { open } = useContext(TooltipContext);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 inline-flex w-max max-w-xs items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 duration-200 pointer-events-none whitespace-normal leading-normal",
        side === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
        side === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
        side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
        side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
        className
      )}
    >
      {children}
    </div>
  );
}
