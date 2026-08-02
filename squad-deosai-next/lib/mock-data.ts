/**
 * Demo data seam.
 * ---------------
 * Realistic fake sellers / products / policies / conversations so every screen
 * is fully functional before real Supabase queries are wired in. Field names
 * are inferred from the product's feature descriptions and kept deliberately
 * simple — the authoritative schema will come from the teammate's Supabase
 * setup. Swap these arrays for real queries without changing component props.
 */

export type StockStatus = "in" | "low" | "out";

export type Product = {
  id: string;
  name: string;
  price: number; // PKR
  discountPrice?: number; // PKR — sale price, shown when set
  category: string;
  description: string;
  sizes: string; // comma-separated, e.g. "S, M, L" or "Gold, Silver"
  inStock: boolean;
  stock: StockStatus;
  photo: string; // emoji stand-in until image upload is wired
};

export type Policies = {
  delivery: string;
  returns: string;
  hours: string;
};

export type Seller = {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappConnected: boolean;
  whatsappRequested: boolean;
  plan: string;
  memberSince: string;
  role: "seller" | "admin";
};

/* ============================================================
   Activity log — replaces full chat threads
   ============================================================ */
export type ActivityKind =
  | "auto-reply"
  | "cod-confirmation"
  | "handoff"
  | "order-confirmed"
  | "order-cancelled";

export type ActivityEntry = {
  id: string;
  at: string; // ISO or display time
  customerName: string;
  customerPhone: string;
  kind: ActivityKind;
  summary: string; // human-readable description of what happened
  question?: string; // the customer's original message (when relevant)
  afterHours: boolean;
};

/* ============================================================
   Orders (COD confirmation flow)
   ============================================================ */
export type OrderStatus = "pending" | "confirmed" | "cancelled";

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  items: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  confirmedAt?: string;
  source: string; // "Shopify" | "WooCommerce" | "Manual"
};

// Legacy types kept for backward compat
export type MessageAuthor = "customer" | "bot" | "seller";
export type MessageKind = "text" | "auto-reply" | "cod-confirmation";

export type Message = {
  id: string;
  author: MessageAuthor;
  kind: MessageKind;
  text: string;
  at: string;
};

export type ConversationStatus = "auto-replied" | "needs-you" | "ordered";

export type Conversation = {
  id: string;
  customerName: string;
  customerPhone: string;
  status: ConversationStatus;
  unread: boolean;
  lastAt: string;
  afterHours: boolean;
  messages: Message[];
};

/* ============================================================
   Seed data
   ============================================================ */

export const currentSeller: Seller = {
  id: "seller_meher",
  businessName: "Meher Handmade",
  ownerName: "Meher Fatima",
  email: "meher@meherhandmade.pk",
  phone: "+92 300 1234567",
  whatsappNumber: "+92 300 1234567",
  whatsappConnected: true,
  whatsappRequested: false,
  plan: "Early Access",
  memberSince: "June 2026",
  role: "seller",
};

export const products: Product[] = [
  {
    id: "p_hoops",
    name: "Gold-tone Hoop Earrings",
    price: 2500,
    discountPrice: 1900,
    category: "Earrings",
    description:
      "18k gold-plated brass hoops, hypoallergenic posts. Diameter 2.5 cm. Lightweight everyday pair.",
    sizes: "Standard",
    inStock: true,
    stock: "low",
    photo: "🪙",
  },
  {
    id: "p_bracelet",
    name: "Beaded Charm Bracelet",
    price: 650,
    category: "Bracelets",
    description:
      "Handmade seed-bead bracelet with gold-fill clasp. Adjustable 6–8 inches. Comes in a gift pouch.",
    sizes: "S, M, L",
    inStock: true,
    stock: "in",
    photo: "📿",
  },
  {
    id: "p_necklace",
    name: "Layered Pendant Necklace",
    price: 1200,
    category: "Necklaces",
    description:
      "Two-layer chain in sterling silver with a hammered disc pendant. Lengths: 16\" + 18\". Tarnish-resistant.",
    sizes: "16\", 18\"",
    inStock: true,
    stock: "in",
    photo: "✨",
  },
  {
    id: "p_collar",
    name: "Cat Collar Charm",
    price: 450,
    category: "Charms",
    description:
      "Miniature cat-shaped pendant in matte gold. Clip-on clasp fits most chain types.",
    sizes: "One Size",
    inStock: false,
    stock: "out",
    photo: "🐱",
  },
  {
    id: "p_anklet",
    name: "Silver Payal Anklet",
    price: 1750,
    discountPrice: 1450,
    category: "Anklets",
    description:
      "Traditional payal-style anklet with ghungroo bells. 925 silver, handcrafted in Lahore. Adjustable chain.",
    sizes: "Free Size",
    inStock: true,
    stock: "in",
    photo: "🦶",
  },
];

export const policies: Policies = {
  delivery:
    "Free delivery inside Lahore. Rs. 200 flat rate nationwide, 2–4 working days via Leopards.",
  returns:
    "7-day exchange on unworn pieces. Made-to-order and custom items are non-refundable.",
  hours: "Open 11 AM – 8 PM, Monday to Saturday. Closed Sundays.",
};

/* ============================================================
   Activity log entries (replaces conversations on seller dashboard)
   ============================================================ */
export const activityLog: ActivityEntry[] = [
  {
    id: "a1",
    at: "02:47 AM",
    customerName: "Ayesha K.",
    customerPhone: "+92 321 8890021",
    kind: "auto-reply",
    summary:
      "Asked about price of Gold-tone Hoop Earrings. Bot replied: Rs. 1,900 (on sale), running low in stock.",
    question: "Assalam o alaikum, price of the gold hoops?",
    afterHours: true,
  },
  {
    id: "a2",
    at: "06:12 PM",
    customerName: "Bilal R.",
    customerPhone: "+92 333 4471190",
    kind: "auto-reply",
    summary:
      "Asked about delivery to Multan and pendant necklace price. Bot replied with price and delivery policy.",
    question: "Do you deliver to Multan? And the pendant necklace price?",
    afterHours: false,
  },
  {
    id: "a3",
    at: "06:21 PM",
    customerName: "Bilal R.",
    customerPhone: "+92 333 4471190",
    kind: "cod-confirmation",
    summary:
      "Customer confirmed COD for Layered Pendant Necklace · Rs. 1,200. Auto-sent COD confirmation.",
    afterHours: false,
  },
  {
    id: "a4",
    at: "09:01 AM",
    customerName: "Sana M.",
    customerPhone: "+92 300 7712004",
    kind: "handoff",
    summary:
      "Custom request — wants a nameplate necklace in rose gold with daughter's name. Bot couldn't answer, flagged for you.",
    question:
      "Can you make a custom nameplate necklace in rose gold with my daughter's name?",
    afterHours: false,
  },
  {
    id: "a5",
    at: "08:40 AM",
    customerName: "Hina A.",
    customerPhone: "+92 345 6650918",
    kind: "auto-reply",
    summary:
      "Asked about Cat Collar Charm availability. Bot replied: sold out, offered to add to restock notification list.",
    question: "Is the cat collar charm available?",
    afterHours: false,
  },
  {
    id: "a6",
    at: "11:58 PM",
    customerName: "Zoya T.",
    customerPhone: "+92 311 2098443",
    kind: "auto-reply",
    summary:
      "Asked about business hours. Bot replied: 11 AM – 8 PM Mon–Sat, offered to answer other questions.",
    question: "What are your timings? Are you open now?",
    afterHours: true,
  },
];

/* ============================================================
   Orders (COD confirmation flow)
   ============================================================ */
export const orders: Order[] = [
  {
    id: "ord_001",
    customerName: "Bilal R.",
    customerPhone: "+92 333 4471190",
    items: "Layered Pendant Necklace × 1",
    total: 1200,
    status: "confirmed",
    createdAt: "2026-07-10T18:20:00Z",
    confirmedAt: "2026-07-10T18:25:00Z",
    source: "Shopify",
  },
  {
    id: "ord_002",
    customerName: "Fatima S.",
    customerPhone: "+92 312 5569001",
    items: "Gold-tone Hoop Earrings × 2, Beaded Charm Bracelet × 1",
    total: 4450,
    status: "pending",
    createdAt: "2026-07-11T09:15:00Z",
    source: "Shopify",
  },
  {
    id: "ord_003",
    customerName: "Ahmed W.",
    customerPhone: "+92 300 2210445",
    items: "Silver Payal Anklet × 1",
    total: 1450,
    status: "cancelled",
    createdAt: "2026-07-09T14:30:00Z",
    source: "WooCommerce",
  },
  {
    id: "ord_004",
    customerName: "Zainab Q.",
    customerPhone: "+92 345 8891234",
    items: "Beaded Charm Bracelet × 3",
    total: 1950,
    status: "pending",
    createdAt: "2026-07-11T11:00:00Z",
    source: "Shopify",
  },
];

// Legacy conversations kept for reference — the activity log replaces these on the UI
export const conversations: Conversation[] = [
  {
    id: "c_ayesha",
    customerName: "Ayesha K.",
    customerPhone: "+92 321 8890021",
    status: "auto-replied",
    unread: false,
    lastAt: "02:47",
    afterHours: true,
    messages: [
      {
        id: "m1",
        author: "customer",
        kind: "text",
        text: "Assalam o alaikum, price of the gold hoops?",
        at: "02:47",
      },
      {
        id: "m2",
        author: "bot",
        kind: "auto-reply",
        text: "Wa alaikum assalam! The Gold-tone Hoop Earrings are Rs. 1,900 (on sale — original Rs. 2,500). They're running low in stock right now. Would you like to order?",
        at: "02:47",
      },
    ],
  },
];

/** Overview roll-ups derived from the activity log. */
export const overviewStats = {
  conversationsToday: activityLog.filter((a) => !a.at.includes("Yesterday"))
    .length,
  autoReplied: activityLog.filter((a) => a.kind === "auto-reply").length,
  needsYou: activityLog.filter((a) => a.kind === "handoff").length,
  ordersConfirmed: orders.filter((o) => o.status === "confirmed").length,
};

/** Demo seller list for admin dashboard. */
export const allSellers: Seller[] = [
  currentSeller,
  {
    id: "seller_shamoon",
    businessName: "Shamoon Leather Co.",
    ownerName: "Shamoon Ali",
    email: "shamoon@shamoonleather.pk",
    phone: "+92 321 9988776",
    whatsappNumber: "+92 321 9988776",
    whatsappConnected: true,
    whatsappRequested: false,
    plan: "Early Access",
    memberSince: "June 2026",
    role: "seller",
  },
  {
    id: "seller_maheen",
    businessName: "Maheen Jewels",
    ownerName: "Maheen Raza",
    email: "maheen@maheenjewels.pk",
    phone: "+92 300 5544332",
    whatsappNumber: "+92 300 5544332",
    whatsappConnected: false,
    whatsappRequested: true,
    plan: "Early Access",
    memberSince: "July 2026",
    role: "seller",
  },
  {
    id: "seller_sticker",
    businessName: "StickerMania PK",
    ownerName: "Usman Tariq",
    email: "usman@stickermania.pk",
    phone: "+92 333 1122334",
    whatsappNumber: "",
    whatsappConnected: false,
    whatsappRequested: false,
    plan: "Early Access",
    memberSince: "July 2026",
    role: "seller",
  },
];

/** Real research figures (from research_data.json) used in marketing copy. */
export const research = {
  lostSalePct: 83,
  manualReplyPct: 92,
  usefulPct: 67,
  openToTestingPct: 100,
  surveyResponses: 12,
  uniqueSellers: 15,
  modalPrice: "Rs. 500–1,000",
  largestSeller: "400–500 orders/day",
};
