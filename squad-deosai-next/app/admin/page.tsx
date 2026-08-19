"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pulse } from "@/components/ui/Pulse";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import { allSellers, type Seller } from "@/lib/mock-data";
import { useDemoMode, DemoModeSwitch } from "@/lib/demo-mode";
import { fetchSellers, updateWhatsAppStatus } from "@/lib/supabase-service";

export default function AdminSellersPage() {
  const scope = useRef<HTMLDivElement>(null);
  const { demoMode } = useDemoMode();

  // Sellers states
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);

  // Search and filter states
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "requested" | "connected" | "not-connected">("all");

  // Load sellers data based on Demo or Live Mode
  const loadSellers = async () => {
    if (demoMode) {
      setSellers(allSellers);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchSellers();
      // Map database schema to Seller type
      const mapped: Seller[] = data.map((d) => ({
        id: d.id,
        businessName: d.business_name || "Unnamed Business",
        ownerName: d.owner_name || "Unknown Owner",
        email: d.email || "",
        phone: d.phone || "",
        whatsappNumber: d.phone || "",
        whatsappConnected: d.whatsapp_connected,
        whatsappRequested: d.whatsapp_requested,
        plan: d.plan || "Early Access",
        memberSince: new Date(d.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        role: d.role,
      }));
      setSellers(mapped);
    } catch (err) {
      console.error("Failed to load live sellers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellers();
  }, [demoMode]);

  // GSAP entrance animation
  useEffect(() => {
    if (loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } });
      tl.from("[data-admin='header']", { y: -15, opacity: 0 })
        .from("[data-admin='metric']", { y: 15, opacity: 0, stagger: 0.08 }, "-=0.3")
        .from("[data-admin='controls']", { y: 10, opacity: 0 }, "-=0.2")
        .from("[data-admin='seller-card']", { y: 15, opacity: 0, stagger: 0.04 }, "-=0.2");
    }, scope);

    return () => ctx.revert();
  }, [loading]);

  // Toggle or Update WhatsApp Status (Approve / Disconnect)
  const handleToggleWhatsApp = async (id: string, currentConnected: boolean, currentRequested: boolean) => {
    setActioningId(id);
    
    // Target state:
    // If connected: disconnect it -> connected=false, requested=false
    // If not connected: approve it -> connected=true, requested=false
    const targetConnected = !currentConnected;
    const targetRequested = false;

    if (demoMode) {
      // Demo Mode: state update only
      setSellers((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, whatsappConnected: targetConnected, whatsappRequested: targetRequested }
            : s
        )
      );
      setActioningId(null);
      return;
    }

    try {
      await updateWhatsAppStatus(id, targetRequested, targetConnected);
      await loadSellers();
    } catch (err) {
      console.error("Failed to update seller WhatsApp status:", err);
    } finally {
      setActioningId(null);
    }
  };

  // KPI Calculations
  const connectedCount = sellers.filter((s) => s.whatsappConnected).length;
  const requestedCount = sellers.filter((s) => s.whatsappRequested && !s.whatsappConnected).length;

  // Search & Tab filtering logic
  const filtered = sellers.filter((s) => {
    const matchesSearch =
      s.businessName.toLowerCase().includes(search.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      filterTab === "all" ||
      (filterTab === "connected" && s.whatsappConnected) ||
      (filterTab === "requested" && s.whatsappRequested && !s.whatsappConnected) ||
      (filterTab === "not-connected" && !s.whatsappConnected && !s.whatsappRequested);

    return matchesSearch && matchesTab;
  });

  const statsCards = [
    {
      title: "Total Sellers",
      value: String(sellers.length),
      subtitle: "Registered on Deosai",
      icon: (
        <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bg: "bg-teal-soft/30",
    },
    {
      title: "Active Connections",
      value: String(connectedCount),
      subtitle: "Approved & messaging active",
      icon: (
        <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-teal-soft/30",
    },
    {
      title: "Pending WA Requests",
      value: String(requestedCount),
      subtitle: "Awaiting Meta setup approval",
      icon: (
        <svg className="h-4 w-4 text-[#8a5a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-marigold-soft/40",
    },
  ];

  return (
    <div ref={scope} className="font-landing space-y-6">
      {/* Header section */}
      <div data-admin="header" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Manage registered sellers, track WhatsApp integration requests, and approve/disconnect channels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DemoModeSwitch />
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statsCards.map((card) => (
          <Card key={card.title} data-admin="metric" className="relative overflow-hidden hover:shadow-md transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink-soft">{card.title}</span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.bg}`}>
                  {card.icon}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold tracking-tight text-ink">{card.value}</p>
                <p className="mt-1.5 text-xs text-ink-soft">{card.subtitle}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Filters and search controls */}
      <div data-admin="controls" className="flex flex-col gap-4 border-t border-b border-line py-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-sm w-full">
          <Label htmlFor="admin-search" className="sr-only">Search sellers</Label>
          <Input
            id="admin-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by business, owner or email…"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", "requested", "connected", "not-connected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold border transition-all duration-200 select-none",
                filterTab === tab
                  ? "bg-teal border-teal text-white shadow-xs"
                  : "bg-paper border-line text-ink-soft hover:bg-teal-soft hover:text-teal hover:border-teal-soft"
              )}
            >
              {tab === "all" && "All Sellers"}
              {tab === "requested" && `Requested (${requestedCount})`}
              {tab === "connected" && `Connected (${connectedCount})`}
              {tab === "not-connected" && `Not Connected (${sellers.length - connectedCount - requestedCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* List items */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-14 text-center">
            <Pulse label="Loading sellers list..." />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardBody className="py-14 text-center">
              <p className="text-sm text-ink-soft">No sellers match your search or filter.</p>
            </CardBody>
          </Card>
        ) : (
          filtered.map((seller) => (
            <Card key={seller.id} data-admin="seller-card" className="hover:shadow-xs transition-shadow">
              <CardBody className="flex flex-wrap items-center gap-4">
                {/* avatar */}
                <div className="grid h-11 w-11 flex-none place-items-center rounded-full bg-paper-deep font-display text-sm text-ink font-bold">
                  {seller.businessName.charAt(0)}
                </div>

                {/* info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ink">
                      {seller.businessName}
                    </p>
                    {seller.whatsappConnected && (
                      <Pulse label="Connected" />
                    )}
                    {!seller.whatsappConnected && seller.whatsappRequested && (
                      <Badge tone="attention">Requesting connection</Badge>
                    )}
                    {!seller.whatsappConnected && !seller.whatsappRequested && (
                      <Badge tone="neutral">Not connected</Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {seller.ownerName} · {seller.email} · {seller.phone || "No phone submitted"}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-ink-faint">
                    Member since {seller.memberSince}
                    {seller.whatsappNumber ? ` · WA: ${seller.whatsappNumber}` : ""}
                  </p>
                </div>

                {/* actions */}
                <div className="flex items-center gap-2 flex-none">
                  {seller.whatsappConnected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-danger/30 text-danger hover:bg-danger/5"
                      onClick={() => handleToggleWhatsApp(seller.id, true, false)}
                      disabled={actioningId === seller.id}
                    >
                      {actioningId === seller.id ? "Working..." : "Disconnect"}
                    </Button>
                  ) : seller.whatsappRequested ? (
                    <Button
                      size="sm"
                      className="bg-teal hover:bg-teal-bright text-white"
                      onClick={() => handleToggleWhatsApp(seller.id, false, true)}
                      disabled={actioningId === seller.id}
                    >
                      {actioningId === seller.id ? "Working..." : "Approve WA"}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleWhatsApp(seller.id, false, false)}
                      disabled={actioningId === seller.id}
                    >
                      {actioningId === seller.id ? "Working..." : "Connect WA"}
                    </Button>
                  )}
                  <Link
                    href={`/admin/sellers/${seller.id}`}
                    className="rounded-lg px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-teal-soft hover:text-teal"
                  >
                    View →
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
