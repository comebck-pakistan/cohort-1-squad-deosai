export const MOCK_USER = {
  id: "usr_123",
  name: "Ayesha Khan",
  businessName: "Ayesha's Wardrobe",
  email: "ayesha@example.com",
  whatsapp: "+92 300 1234567",
  plan: "Pro",
};

export const MOCK_METRICS = {
  automatedReplies: 142,
  conversationsHandled: 89,
  ordersConfirmed: 24,
  handoffRequired: 12,
  timeSaved: "14h",
  catalogueItems: 45
};

export const MOCK_PRODUCTS = [
  {
    id: "prod_001",
    name: "Pearl Drop Earrings",
    price: 1850,
    category: "Jewellery",
    availability: "In Stock",
    variants: ["Gold", "Silver"],
    description: "Elegant pearl drop earrings for casual and formal wear.",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod_002",
    name: "Embroidered Lawn Suit",
    price: 4500,
    category: "Fashion",
    availability: "Low Stock",
    variants: ["Small", "Medium", "Large"],
    description: "Premium embroidered lawn suit with chiffon dupatta.",
    imageUrl: "https://images.unsplash.com/photo-1622122201714-77da0caa7cb0?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "prod_003",
    name: "Matte Lipstick Set",
    price: 2200,
    category: "Beauty",
    availability: "In Stock",
    variants: ["Red", "Nude", "Pink"],
    description: "Long-lasting matte liquid lipsticks in 3 elegant shades.",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80"
  }
];

export const MOCK_CONVERSATIONS = [
  {
    id: "conv_001",
    customerName: "Sara Ali",
    channel: "WhatsApp",
    status: "AI Answered",
    lastMessage: "Is this available in silver?",
    confidence: 92,
    updatedAt: "2 min ago",
    messages: [
      { sender: "customer", text: "Hi, I saw the pearl earrings on your page.", time: "10:00 AM" },
      { sender: "ai", text: "Hello! Yes, the Pearl Drop Earrings are available. They cost Rs. 1,850.", time: "10:01 AM" },
      { sender: "customer", text: "Is this available in silver?", time: "10:02 AM" },
      { sender: "ai", text: "Yes, we have them in both Gold and Silver variants. Would you like to place an order?", time: "10:02 AM" }
    ]
  },
  {
    id: "conv_002",
    customerName: "Fatima Noor",
    channel: "WhatsApp",
    status: "Handoff",
    lastMessage: "Can you give a discount if I buy 3 suits?",
    confidence: 45,
    updatedAt: "15 min ago",
    messages: [
      { sender: "customer", text: "I need 3 of the Embroidered Lawn Suits.", time: "09:45 AM" },
      { sender: "ai", text: "Great! We have Small, Medium, and Large available. Which sizes would you prefer?", time: "09:45 AM" },
      { sender: "customer", text: "Can you give a discount if I buy 3 suits?", time: "09:46 AM" },
      { sender: "system", text: "AI Confidence low. Handoff to human.", time: "09:46 AM" }
    ]
  },
  {
    id: "conv_003",
    customerName: "Zainab Malik",
    channel: "Instagram",
    status: "Order Placed",
    lastMessage: "Okay, confirm my COD order.",
    confidence: 98,
    updatedAt: "1 hr ago",
    messages: [
      { sender: "customer", text: "Do you deliver to Multan?", time: "08:30 AM" },
      { sender: "ai", text: "Yes, we deliver all over Pakistan, including Multan. Delivery takes 3-5 working days.", time: "08:30 AM" },
      { sender: "customer", text: "Okay, confirm my COD order.", time: "08:31 AM" },
      { sender: "ai", text: "Your COD order has been confirmed! We will dispatch it tomorrow. Order ID: ORD-1024.", time: "08:31 AM" }
    ]
  }
];

export const MOCK_ORDERS = [
  {
    id: "ORD-1024",
    customerName: "Zainab Malik",
    product: "Pearl Drop Earrings",
    amount: 1850,
    city: "Multan",
    codStatus: "Pending Confirmation",
    confirmationStatus: "Message Sent",
    date: "Today, 08:31 AM"
  },
  {
    id: "ORD-1023",
    customerName: "Hira Ahmed",
    product: "Embroidered Lawn Suit",
    amount: 4500,
    city: "Lahore",
    codStatus: "Confirmed",
    confirmationStatus: "Confirmed by AI",
    date: "Yesterday, 04:15 PM"
  }
];

export const MOCK_POLICIES = {
  deliveryCharges: 250,
  deliveryTime: "3-5 working days",
  returnPolicy: "Returns accepted within 7 days for defective items only.",
  exchangePolicy: "Exchanges allowed within 3 days. Delivery charges apply.",
  businessHours: "Monday to Saturday, 10 AM to 6 PM",
  codAvailable: true
};

export const MOCK_AGENT = {
  name: "Sana",
  tone: "Professional yet friendly",
  language: "Mixed (Roman Urdu + English)",
  replyLength: "Short and direct",
  handoffUnsure: true,
  confirmCod: true,
  confidenceThreshold: 85
};
