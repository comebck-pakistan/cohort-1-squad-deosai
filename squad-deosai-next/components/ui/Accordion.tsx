"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";

const AccordionContext = createContext<{
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}>({ activeItem: null, setActiveItem: () => {} });

const AccordionItemContext = createContext<{ value: string }>({ value: "" });

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "single";
  collapsible?: boolean;
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={cn("flex w-full flex-col overflow-hidden", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeItem } = useContext(AccordionContext);
  const isOpen = activeItem === value;

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "border-b border-line transition-colors duration-300",
          isOpen && "bg-slate-50/50",
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { value } = useContext(AccordionItemContext);
  const { activeItem, setActiveItem } = useContext(AccordionContext);
  const isOpen = activeItem === value;

  return (
    <button
      type="button"
      onClick={() => setActiveItem(isOpen ? null : value)}
      className={cn(
        "flex w-full items-center justify-between py-6 font-semibold outline-none hover:no-underline text-left cursor-pointer",
        className
      )}
    >
      {children}
      <span className="shrink-0 ml-auto flex items-center justify-center">
        {isOpen ? (
          <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} className="size-4 text-ink-soft transition-transform duration-200" />
        ) : (
          <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-4 text-ink-soft transition-transform duration-200" />
        )}
      </span>
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { value } = useContext(AccordionItemContext);
  const { activeItem } = useContext(AccordionContext);
  const isOpen = activeItem === value;

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "pb-7 pl-9 text-[15px] leading-7 text-ink-soft animate-in fade-in-0 duration-350 ease-out",
        className
      )}
    >
      {children}
    </div>
  );
}
