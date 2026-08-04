"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { useDemoMode, DemoModeSwitch } from "@/lib/demo-mode";
import {
  fetchConversations,
  fetchMessages,
  insertMessage,
  updateConversationStatus,
  seedDatabase,
  DBConversation
} from "@/lib/supabase-service";

interface HandoffItem {
  id: string;
  customerName: string;
  customerPhone: string;
  question: string;
  draftReply: string;
  time: string;
}

export default function DashboardOverview() {
  const scope = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { demoMode } = useDemoMode();

  // Loading and database states for Live Mode
  const [liveConvs, setLiveConvs] = useState<DBConversation[]>([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Stateful UI lists
  const [handoffs, setHandoffs] = useState<HandoffItem[]>([]);
  const [approvedList, setApprovedList] = useState<string[]>([]);

  // 1. Mock Data Definitions (Used in Demo Mode)
  const mockHandoffs: HandoffItem[] = [
    {
      id: "h_sana",
      customerName: "Sana M.",
      customerPhone: "+92 300 7712004",
      question: "Can you make a custom nameplate necklace in rose gold with my daughter's name?",
      draftReply: "Assalam o alaikum Sana! Yes, we can make custom nameplate necklaces in rose gold plating. It typically takes 5–7 working days for customization. The price is Rs. 2,200. Would you like to proceed?",
      time: "09:01 AM",
    }
  ];

  const mockRecentChats = [
    { name: "Sana M.", phone: "+92 300 7712004", status: "needs-you" as const, time: "10 mins ago" },
    { name: "Ayesha K.", phone: "+92 321 8890021", status: "auto-replied" as const, time: "1 hour ago" },
    { name: "Bilal R.", phone: "+92 333 4471190", status: "ordered" as const, time: "2 hours ago" },
    { name: "Zoya T.", phone: "+92 311 2098443", status: "auto-replied" as const, time: "Yesterday" },
  ];

  // 2. Fetch and Sync Function
  const loadData = async () => {
    if (demoMode) {
      // Demo Mode: Load mocks
      setHandoffs(mockHandoffs);
      setLiveConvs([]);
      return;
    }

    if (!user) return;

    try {
      setLoadingLive(true);
      const convs = await fetchConversations(user.id);
      setLiveConvs(convs);

      // Fetch messages for each needs-you conversation to construct handoffs
      const handoffItems: HandoffItem[] = [];
      const needsYouConvs = convs.filter((c) => c.status === "needs-you");

      for (const c of needsYouConvs) {
        const msgs = await fetchMessages(user.id, c.id);
        const lastCustomerMsg = [...msgs].reverse().find((m) => m.author === "customer");
        const lastBotMsg = [...msgs].reverse().find((m) => m.author === "bot");

        handoffItems.push({
          id: c.id,
          customerName: c.customer_name || "Unknown",
          customerPhone: c.customer_phone || "",
          question: lastCustomerMsg?.body || "Inquiry received.",
          draftReply: lastBotMsg?.body || "Assalam o alaikum! We will process your request shortly.",
          time: new Date(c.last_message_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }

      setHandoffs(handoffItems);
    } catch (err) {
      console.error("Failed to load Supabase overview:", err);
    } finally {
      setLoadingLive(false);
    }
  };

  // Sync data on load and when demoMode switches
  useEffect(() => {
    loadData();
  }, [demoMode, user]);

  // Handle handoff approval (Send response draft to customer)
  const handleApprove = async (id: string, item: HandoffItem) => {
    setApprovedList((prev) => [...prev, id]);

    if (!demoMode && user) {
      try {
        // 1. Insert bot message into Supabase
        await insertMessage(user.id, id, item.draftReply, "bot", "outbound");
        // 2. Mark conversation as replied (auto-replied)
        await updateConversationStatus(user.id, id, "auto-replied");
      } catch (err) {
        console.error("Failed to save handoff approval:", err);
      }
    }

    setTimeout(() => {
      setHandoffs((prev) => prev.filter((h) => h.id !== id));
      if (!demoMode) loadData(); // Refresh overview lists
    }, 1000);
  };

  // Seed actual Supabase records with one click
  const handleSeedDatabase = async () => {
    if (!user) return;
    try {
      setSeeding(true);
      await seedDatabase(user.id);
      await loadData();
    } catch (err) {
      alert("Seeding failed. Make sure your local database is running.");
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
        .from("[data-dash='header']", { y: -20, opacity: 0 })
        .from("[data-dash='stat']", { y: 20, opacity: 0, stagger: 0.08 }, "-=0.5")
        .from("[data-dash='main-grid']", { y: 32, opacity: 0 }, "-=0.6");
    }, scope);
    return () => ctx.revert();
  }, []);

  // 3. Dynamic Stats Calculation
  const autoRepliesCount = demoMode 
    ? 14 
    : liveConvs.filter((c) => c.status === "auto-replied" || c.status === "ordered").length;
  
  const totalThreads = demoMode ? 6 : liveConvs.length;
  
  const automationRate = totalThreads > 0 
    ? `${Math.round((autoRepliesCount / totalThreads) * 100)}%` 
    : "100%";

  const statsCards = [
    {
      title: "Awaiting Reply",
      value: handoffs.length,
      subtitle: "Conversations flagged for you",
      icon: (
        <svg className="h-4 w-4 text-[#8a5a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-marigold-soft/40",
    },
    {
      title: "Auto-replies Today",
      value: String(autoRepliesCount),
      subtitle: "Successfully answered by AI",
      icon: (
        <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bg: "bg-teal-soft/30",
    },
    {
      title: "Automation Rate",
      value: automationRate,
      subtitle: "Of inquiries handled without human help",
      icon: (
        <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-teal-soft/30",
    },
    {
      title: "Active Threads",
      value: String(totalThreads),
      subtitle: "Conversations in past 24h",
      icon: (
        <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      bg: "bg-teal-soft/30",
    },
  ];

  // Render recent conversations list based on active mode
  const renderRecentChats = () => {
    if (demoMode) {
      return mockRecentChats;
    }
    return liveConvs.slice(0, 5).map((c) => {
      const status = c.status as "needs-you" | "auto-replied" | "ordered";
      const timeDiff = Date.now() - new Date(c.last_message_at).getTime();
      const mins = Math.floor(timeDiff / (60 * 1000));
      let timeLabel = "Just now";
      if (mins > 0 && mins < 60) timeLabel = `${mins} mins ago`;
      else if (mins >= 60 && mins < 1440) timeLabel = `${Math.floor(mins / 60)} hours ago`;
      else if (mins >= 1440) timeLabel = "Yesterday";

      return {
        name: c.customer_name || "Customer",
        phone: c.customer_phone || "",
        status,
        time: timeLabel,
      };
    });
  };

  const chatsToShow = renderRecentChats();

  return (
    <div ref={scope} className="font-landing space-y-6">
      <div data-dash="header" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Live overview of your WhatsApp auto-responses and inquiries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DemoModeSwitch />
          <Link
            href="/dashboard/inbox"
            className="inline-flex items-center justify-center rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-teal-bright"
          >
            Open Live Inbox
          </Link>
        </div>
      </div>

      {/* Seeding Callout for Empty Database in Live Mode */}
      {!demoMode && !loadingLive && liveConvs.length === 0 && (
        <Card className="border-teal-soft bg-teal-soft/5">
          <CardBody className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <p className="text-sm font-bold text-ink flex items-center gap-2 justify-center md:justify-start">
                <span>🌐</span> Live Database Active (No Records Found)
              </p>
              <p className="text-xs text-ink-soft">
                Connect your WhatsApp Business account under Setup, or seed realistic mock conversations into Supabase to test your configuration immediately.
              </p>
            </div>
            <Button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="bg-teal hover:bg-teal-bright text-paper shrink-0"
            >
              {seeding ? "Seeding Database..." : "Seed Database with Test Data"}
            </Button>
          </CardBody>
        </Card>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((card) => (
          <Card key={card.title} data-dash="stat" className="relative overflow-hidden hover:shadow-md transition-shadow">
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

      {/* Main split grid */}
      <div data-dash="main-grid" className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* Waiting for approval / Handoffs queue */}
          <Card>
            <CardHeader
              title="Awaiting your reply"
              description="Customer questions that the AI agent could not answer and handed off to you."
              action={
                handoffs.length > 0 ? (
                  <Badge tone="marigold">{handoffs.length} Needs Reply</Badge>
                ) : undefined
              }
            />
            <CardBody className="p-0 divide-y divide-line">
              {loadingLive ? (
                <div className="py-12 text-center text-xs text-ink-soft font-mono">
                  Loading live conversations...
                </div>
              ) : handoffs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <span className="text-3xl mb-2">🎉</span>
                  <p className="text-sm font-semibold text-ink">All clear!</p>
                  <p className="text-xs text-ink-soft mt-0.5">
                    Your AI agent is successfully handling all active conversations.
                  </p>
                </div>
              ) : (
                handoffs.map((item) => {
                  const isApproved = approvedList.includes(item.id);
                  return (
                    <div key={item.id} className="p-5 space-y-3 transition-opacity">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-7 w-7 rounded-full bg-teal-soft/40 text-teal font-bold flex items-center justify-center text-xs">
                            {item.customerName.charAt(0)}
                          </span>
                          <div>
                            <span className="text-sm font-semibold text-ink">{item.customerName}</span>
                            <span className="ml-2 text-xs text-ink-faint font-mono">{item.customerPhone}</span>
                          </div>
                        </div>
                        <span className="text-xs text-ink-faint tabular-nums">{item.time}</span>
                      </div>
                      
                      {/* Customer question */}
                      <div className="bg-paper/40 border border-line rounded-lg p-3 text-xs text-ink italic">
                        &ldquo;{item.question}&rdquo;
                      </div>

                      {/* AI drafted reply */}
                      <div className="bg-teal-soft/10 border border-teal-soft/30 rounded-lg p-3">
                        <p className="text-[10px] uppercase font-bold text-teal tracking-wider mb-1">
                          ✦ AI Drafted Response
                        </p>
                        <p className="text-xs text-ink">{item.draftReply}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 justify-end">
                        <Link href="/dashboard/inbox">
                          <Button variant="outline" size="sm">
                            Edit in Inbox
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(item.id, item)}
                          className={cn(
                            "transition-all",
                            isApproved
                              ? "bg-live text-white"
                              : "bg-teal hover:bg-teal-bright text-white"
                          )}
                          disabled={isApproved}
                        >
                          {isApproved ? "✓ Sent" : "Approve & Send"}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Recent Conversations */}
          <Card>
            <CardHeader
              title="Recent Chats"
              action={
                <Link href="/dashboard/inbox" className="text-xs font-semibold text-teal hover:underline">
                  View all →
                </Link>
              }
            />
            <CardBody className="p-0 divide-y divide-line">
              {loadingLive ? (
                <div className="py-8 text-center text-xs text-ink-soft font-mono">
                  Loading chats...
                </div>
              ) : chatsToShow.length === 0 ? (
                <div className="py-8 text-center text-xs text-ink-soft">
                  No conversations yet.
                </div>
              ) : (
                chatsToShow.map((c) => {
                  const statusMeta = {
                    "needs-you": { label: "Needs you", tone: "attention" as const },
                    "auto-replied": { label: "Auto-replied", tone: "live" as const },
                    ordered: { label: "Ordered", tone: "neutral" as const },
                  };
                  const meta = statusMeta[c.status] || { label: c.status || "Active", tone: "neutral" as const };
                  return (
                    <Link
                      key={c.phone}
                      href="/dashboard/inbox"
                      className="flex items-center gap-3 p-4 hover:bg-paper/20 transition-colors"
                    >
                      <span className="h-8 w-8 rounded-full bg-teal-soft/40 text-teal font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-ink truncate">{c.name}</span>
                          <span className="text-[10px] text-ink-faint">{c.time}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[10px] text-ink-faint font-mono">{c.phone}</span>
                          <Badge tone={meta.tone}>{meta.label}</Badge>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
