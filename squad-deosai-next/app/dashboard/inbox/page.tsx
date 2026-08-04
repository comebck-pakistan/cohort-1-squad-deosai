"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { useDemoMode, DemoModeSwitch } from "@/lib/demo-mode";
import {
  fetchConversations,
  fetchMessages,
  insertMessage,
  updateConversationStatus,
  seedDatabase
} from "@/lib/supabase-service";

interface Message {
  id: string;
  sender: "customer" | "bot" | "seller";
  body: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  status: "needs-you" | "auto-replied" | "ordered";
  lastMessageAt: string;
  messages: Message[];
}

const seedConversations: Conversation[] = [
  {
    id: "c_sana",
    customerName: "Sana M.",
    customerPhone: "+92 300 7712004",
    status: "needs-you",
    lastMessageAt: "09:01 AM",
    messages: [
      {
        id: "m_sana_1",
        sender: "customer",
        body: "Can you make a custom nameplate necklace in rose gold with my daughter's name?",
        createdAt: "09:01 AM",
      },
      {
        id: "m_sana_2",
        sender: "bot",
        body: "I'm not sure if we can customize rose gold plate names. Let me hand this over to Meher Fatima to answer you shortly! 🌸",
        createdAt: "09:01 AM",
      },
    ],
  },
  {
    id: "c_ayesha",
    customerName: "Ayesha K.",
    customerPhone: "+92 321 8890021",
    status: "auto-replied",
    lastMessageAt: "02:47 AM",
    messages: [
      {
        id: "m_ayesha_1",
        sender: "customer",
        body: "Assalam o alaikum, price of the gold hoops?",
        createdAt: "02:47 AM",
      },
      {
        id: "m_ayesha_2",
        sender: "bot",
        body: "Wa alaikum assalam! The Gold-tone Hoop Earrings are Rs. 1,900 (on sale — original Rs. 2,500). They're running low in stock right now. Would you like to order?",
        createdAt: "02:47 AM",
      },
    ],
  },
  {
    id: "c_bilal",
    customerName: "Bilal R.",
    customerPhone: "+92 333 4471190",
    status: "ordered",
    lastMessageAt: "06:21 PM",
    messages: [
      {
        id: "m_bilal_1",
        sender: "customer",
        body: "Do you deliver to Multan? And the pendant necklace price?",
        createdAt: "06:12 PM",
      },
      {
        id: "m_bilal_2",
        sender: "bot",
        body: "Yes, we deliver nationwide via Leopards! The Layered Pendant Necklace is Rs. 1,200.",
        createdAt: "06:13 PM",
      },
      {
        id: "m_bilal_3",
        sender: "customer",
        body: "I want to place an order for the necklace.",
        createdAt: "06:20 PM",
      },
      {
        id: "m_bilal_4",
        sender: "bot",
        body: "Awesome! I've logged a COD order for Layered Pendant Necklace. Please click Confirm to lock it in.",
        createdAt: "06:21 PM",
      },
      {
        id: "m_bilal_5",
        sender: "customer",
        body: "Confirm",
        createdAt: "06:21 PM",
      },
      {
        id: "m_bilal_6",
        sender: "bot",
        body: "✅ Thank you! Your order has been confirmed. We'll dispatch it soon.",
        createdAt: "06:21 PM",
      },
    ],
  },
  {
    id: "c_zoya",
    customerName: "Zoya T.",
    customerPhone: "+92 311 2098443",
    status: "auto-replied",
    lastMessageAt: "11:58 PM",
    messages: [
      {
        id: "m_zoya_1",
        sender: "customer",
        body: "What are your timings? Are you open now?",
        createdAt: "11:58 PM",
      },
      {
        id: "m_zoya_2",
        sender: "bot",
        body: "We are open Monday to Saturday from 11 AM to 8 PM. Since it is currently after hours, we will process any orders or queries first thing tomorrow morning!",
        createdAt: "11:58 PM",
      },
    ],
  },
];

export default function InboxPage() {
  const { user } = useAuth();
  const { demoMode } = useDemoMode();

  const [conversations, setConversations] = useState<Conversation[]>(seedConversations);
  const [activeId, setActiveId] = useState<string>("c_sana");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "needs-you" | "replied">("all");
  const [draft, setDraft] = useState("");
  const [agentDraft, setAgentDraft] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [loadingLive, setLoadingLive] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeChat = conversations.find((c) => c.id === activeId);

  // Sync data on mount and demo mode change
  const loadConversations = async () => {
    if (demoMode) {
      setConversations(seedConversations);
      const exists = seedConversations.some((c) => c.id === activeId);
      if (!exists && seedConversations.length > 0) {
        setActiveId(seedConversations[0].id);
      }
      return;
    }

    if (!user) return;

    try {
      setLoadingLive(true);
      const dbConvs = await fetchConversations(user.id);
      const mappedConvs: Conversation[] = [];

      for (const c of dbConvs) {
        const dbMsgs = await fetchMessages(user.id, c.id);
        const mappedMsgs: Message[] = dbMsgs.map((m) => ({
          id: m.id,
          sender: m.author === "system" ? "bot" : (m.author as "customer" | "bot" | "seller"),
          body: m.body,
          createdAt: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));

        mappedConvs.push({
          id: c.id,
          customerName: c.customer_name || "Unknown",
          customerPhone: c.customer_phone || "",
          status: c.status as "needs-you" | "auto-replied" | "ordered",
          lastMessageAt: new Date(c.last_message_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          messages: mappedMsgs,
        });
      }

      setConversations(mappedConvs);
      if (mappedConvs.length > 0) {
        const exists = mappedConvs.some((c) => c.id === activeId);
        if (!exists) {
          setActiveId(mappedConvs[0].id);
        }
      } else {
        setActiveId("");
      }
    } catch (err) {
      console.error("Failed to load live conversations:", err);
    } finally {
      setLoadingLive(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [demoMode, user]);

  // Seeding button trigger
  const handleSeedDatabase = async () => {
    if (!user) return;
    try {
      setSeeding(true);
      await seedDatabase(user.id);
      await loadConversations();
    } catch (err) {
      alert("Seeding failed. Make sure your database server is running.");
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  // Auto scroll chat list to bottom on active chat switch
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, activeChat?.messages.length]);

  // Filter conversations
  const filtered = conversations.filter((c) => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.customerPhone.includes(search);
    if (!matchesSearch) return false;

    if (filter === "needs-you") return c.status === "needs-you";
    if (filter === "replied") return c.status !== "needs-you";
    return true;
  });

  // Handle manual reply send
  const handleSendReply = async () => {
    if (!draft.trim() || !activeChat) return;

    if (demoMode) {
      const newMsg: Message = {
        id: `msg_seller_${Date.now()}`,
        sender: "seller",
        body: draft.trim(),
        createdAt: new Date().toLocaleTimeString("en-PK", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeChat.id
            ? {
                ...c,
                status: "auto-replied",
                lastMessageAt: newMsg.createdAt,
                messages: [...c.messages, newMsg],
              }
            : c
        )
      );
      setDraft("");
      setAgentDraft("");
      return;
    }

    if (!user) return;

    try {
      // 1. Insert message row into Supabase
      await insertMessage(user.id, activeChat.id, draft.trim(), "seller", "outbound");
      // 2. Mark conversation as replied
      await updateConversationStatus(user.id, activeChat.id, "auto-replied");
      setDraft("");
      setAgentDraft("");
      // 3. Reload conversations
      await loadConversations();
    } catch (err) {
      console.error("Failed to insert outbound message:", err);
    }
  };

  // Ask AI Agent to draft reply
  const handleAskAgent = () => {
    if (!activeChat) return;
    setIsDrafting(true);
    setAgentDraft("");

    setTimeout(() => {
      let draftText = "";
      if (demoMode) {
        if (activeChat.id === "c_sana") {
          draftText =
            "Assalam o alaikum Sana! Yes, we can make custom nameplate necklaces in rose gold plating. It typically takes 5–7 working days for customization. The price is Rs. 2,200. Would you like to proceed with the order details?";
        } else if (activeChat.id === "c_ayesha") {
          draftText =
            "Wa alaikum assalam Ayesha! The Gold Hoops are currently in stock for Rs. 1,900. Since you are in Lahore, delivery is completely free! Should I reserve a pair for you?";
        } else if (activeChat.id === "c_zoya") {
          draftText =
            "Hi Zoya! We are currently open. How can we assist you with our catalog today?";
        } else {
          draftText =
            "Hi! Thanks for reaching out to Meher Handmade. How can we assist you with our catalog today?";
        }
      } else {
        // Live Mode generic prompt draft builder based on last customer question
        const lastCustMsg = [...activeChat.messages].reverse().find(m => m.sender === "customer");
        const promptSeed = lastCustMsg ? lastCustMsg.body.toLowerCase() : "";
        
        if (promptSeed.includes("price") || promptSeed.includes("kya rate") || promptSeed.includes("charges")) {
          draftText = "Assalam o alaikum! We will check the price details for your requested jewelry items and get back to you shortly. Shipping is a flat Rs. 150.";
        } else if (promptSeed.includes("delivery") || promptSeed.includes("deliver")) {
          draftText = "Assalam o alaikum! Yes, we deliver nationwide in Pakistan within 2-3 working days. Leopards COD option is fully available.";
        } else {
          draftText = "Wa alaikum assalam! Let me check this catalog detail for you. I will reply here in just a minute.";
        }
      }
      setDraft(draftText);
      setIsDrafting(false);
    }, 800);
  };

  const statusMeta = {
    "needs-you": { label: "Needs you", tone: "attention" as const },
    "auto-replied": { label: "Auto-replied", tone: "live" as const },
    ordered: { label: "Ordered", tone: "neutral" as const },
  };

  return (
    <div className="font-landing h-[calc(100vh-6.5rem)] flex flex-col">
      <div className="flex-none mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Inbox</h1>
          <p className="text-sm text-ink-soft mt-1">
            Monitor auto-responses and reply to your WhatsApp customers directly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DemoModeSwitch />
        </div>
      </div>

      {/* Main Inbox Panel */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[340px_1fr] bg-card-strong border border-line rounded-[var(--radius-card)] overflow-hidden shadow-sm">
        {/* Left Column: List */}
        <div className="border-r border-line flex flex-col min-h-0 bg-card-strong">
          <div className="p-4 border-b border-line space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">
                🔍
              </span>
              <Input
                placeholder="Search chats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
            {/* Filter buttons */}
            <div className="flex gap-1">
              {(
                [
                  ["all", "All"],
                  ["needs-you", "Needs you"],
                  ["replied", "Replied"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                    filter === key
                      ? "bg-teal-soft text-teal"
                      : "text-ink-soft hover:bg-paper hover:text-ink"
                  )}
                >
                  {label}
                  {key === "needs-you" &&
                    conversations.filter((c) => c.status === "needs-you").length > 0 && (
                      <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-marigold px-1 text-[9px] font-bold text-ink">
                        {conversations.filter((c) => c.status === "needs-you").length}
                      </span>
                    )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-line">
            {loadingLive ? (
              <div className="p-8 text-center text-xs text-ink-soft font-mono">
                Loading live conversations...
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-ink-soft">
                No conversations found
              </div>
            ) : (
              filtered.map((chat) => {
                const meta = statusMeta[chat.status] || { label: chat.status, tone: "neutral" as const };
                const active = chat.id === activeId;
                const lastMsg = chat.messages[chat.messages.length - 1];

                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveId(chat.id)}
                    className={cn(
                      "w-full text-left p-4 flex gap-3 items-start transition-colors",
                      active ? "bg-paper-deep" : "hover:bg-paper/30"
                    )}
                  >
                    <span className="h-9 w-9 rounded-full bg-teal-soft/40 text-teal font-bold flex items-center justify-center text-sm">
                      {chat.customerName.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-ink truncate">
                          {chat.customerName}
                        </span>
                        <span className="text-[10px] text-ink-faint tabular-nums shrink-0">
                          {chat.lastMessageAt}
                        </span>
                      </div>
                      <p className="text-xs text-ink-soft truncate mt-0.5">
                        {lastMsg ? lastMsg.body : "No messages"}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge tone={meta.tone}>{meta.label}</Badge>
                        <span className="text-[10px] font-mono text-ink-faint">
                          {chat.customerPhone}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat View */}
        <div className="flex flex-col min-h-0 bg-paper/20">
          {!demoMode && conversations.length === 0 && !loadingLive ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none space-y-4">
              <span className="text-4xl">💬</span>
              <p className="text-sm font-semibold text-ink">Your Live Inbox is empty</p>
              <p className="text-xs text-ink-soft max-w-sm">
                Meta cloud webhooks are configured but no customer messages have landed yet. Click below to seed test chats into your database.
              </p>
              <Button
                onClick={handleSeedDatabase}
                disabled={seeding}
                className="bg-teal hover:bg-teal-bright text-paper"
              >
                {seeding ? "Seeding Database..." : "Seed Database with Test Data"}
              </Button>
            </div>
          ) : activeChat ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-card-strong">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-teal text-white font-bold flex items-center justify-center text-base shadow-sm">
                    {activeChat.customerName.charAt(0)}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink">
                      {activeChat.customerName}
                    </h3>
                    <p className="text-xs text-ink-soft font-mono mt-0.5">
                      {activeChat.customerPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={statusMeta[activeChat.status]?.tone || "neutral"}>
                    {statusMeta[activeChat.status]?.label || activeChat.status}
                  </Badge>
                  <span className="text-xs text-ink-faint">· WhatsApp Channel</span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeChat.messages.map((msg) => {
                  const isSeller = msg.sender === "seller";
                  const isBot = msg.sender === "bot";

                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex flex-col max-w-[75%]",
                        isSeller
                          ? "ml-auto items-end"
                          : isBot
                          ? "mr-auto items-start max-w-[85%]"
                          : "mr-auto items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm",
                          isSeller
                            ? "bg-teal text-white rounded-br-none"
                            : isBot
                            ? "bg-teal-soft/15 border border-teal-soft text-ink rounded-bl-none"
                            : "bg-card-strong border border-line text-ink rounded-bl-none"
                        )}
                      >
                        <p className="whitespace-pre-wrap">{msg.body}</p>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[9px] uppercase tracking-wide opacity-70">
                          <span>
                            {isSeller ? "You" : isBot ? "🤖 AI Agent" : "Customer"}
                          </span>
                          <span>·</span>
                          <span className="tabular-nums">{msg.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Action/Input Block */}
              <div className="border-t border-line bg-card-strong p-4 space-y-3">
                <div className="flex items-end gap-2">
                  <textarea
                    placeholder="Type a reply... (Press Enter to send)"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    rows={2}
                    className="flex-1 min-h-0 text-xs border border-line rounded-xl px-3 py-2.5 bg-paper/20 focus:bg-card-strong focus:outline-none focus:ring-1 focus:ring-teal resize-none"
                  />
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={handleSendReply}
                      disabled={!draft.trim()}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-white hover:bg-teal-bright disabled:opacity-40 transition-colors shadow-sm"
                      title="Send message"
                    >
                      ➔
                    </button>
                    <button
                      onClick={handleAskAgent}
                      disabled={isDrafting}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-teal text-teal hover:bg-teal-soft/20 disabled:opacity-40 transition-colors"
                      title="Ask AI to draft reply"
                    >
                      {isDrafting ? "⌛" : "✦"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-ink-faint px-1">
                  <span>Owner replies send immediately via WhatsApp Cloud APIs.</span>
                  <span>Click <strong>✦</strong> to draft custom AI answers.</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
              <span className="text-4xl mb-3">💬</span>
              <p className="text-sm font-semibold text-ink">Select a Conversation</p>
              <p className="text-xs text-ink-soft max-w-sm mt-1">
                Choose a customer on the left to review chat history, configure custom prompts, and auto-reply.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
