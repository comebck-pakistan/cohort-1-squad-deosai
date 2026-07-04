/* =====================================================================
   Squad Deosai — Research Landing Page
   All figures below are sourced from research_data.json (single source
   of truth). Nothing is invented or rounded beyond that file.
   ===================================================================== */

/* ---------- Data (mirrors research_data.json) ---------- */
const DATA = {
  survey: {
    dailyInquiryVolume: [
      { label: "< 10", count: 7 },
      { label: "10–25", count: 3 },
      { label: "25–50", count: 1 },
      { label: "50–100", count: 1 },
    ],
    timeSpentDailyReplying: [
      { label: "< 30 min", count: 4 },
      { label: "30 min – 1 hr", count: 5 },
      { label: "1–2 hrs", count: 2 },
      { label: "2–4 hrs", count: 1 },
    ],
    lostSaleFromSlowReply: [
      { label: "Rarely", count: 7 },
      { label: "Sometimes", count: 3 },
      { label: "Never", count: 2 },
    ],
    perceivedUsefulness: [
      { label: "Extremely useful", count: 3 },
      { label: "Very useful", count: 5 },
      { label: "Somewhat useful", count: 3 },
      { label: "Not useful", count: 1 },
    ],
    firstAutomationPriority: [
      { label: "Product Questions", count: 8 },
      { label: "COD Confirmation", count: 1 },
      { label: "Stock Availability", count: 1 },
      { label: "Delivery Information", count: 1 },
      { label: "Returns & Exchanges", count: 1 },
    ],
    willingnessToPay: [
      { label: "Definitely", count: 3 },
      { label: "Maybe", count: 7 },
      { label: "Unlikely", count: 1 },
      { label: "No", count: 1 },
    ],
    pricePoint: [
      { label: "< Rs. 500", count: 3 },
      { label: "Rs. 500–1,000", count: 7 },
      { label: "Rs. 2,500–5,000", count: 2 },
    ],
    earlyTestingInterest: [
      { label: "Yes", count: 4 },
      { label: "Maybe", count: 8 },
    ],
  },
  interviews: [
    {
      business: "StickerMania",
      contact: "Khadija Qureshi",
      replyTime: "1–2 days",
      firstAutomationChoice: "Pricing responses",
      status: "confirmed",
      quote: "Price DMs sometimes crowd out DMs from customers actually ready to order.",
      takeaway: "Clearest signal in the batch — a validated missed-notification lost sale, plus explicit testing interest.",
      counter: false,
    },
    {
      business: "AP Crafts",
      contact: "Eemaan Syed",
      replyTime: "Not specified",
      firstAutomationChoice: "Skeptical — prefers a narrower closed-hours / policy responder",
      status: "maybe",
      quote: "A bot can't negotiate a one-off custom order the way a human can.",
      takeaway: "Clearest counter-signal — custom/bespoke sellers are a weaker fit for the full five-question assistant.",
      counter: true,
    },
    {
      business: "Jewellery with Maheen",
      contact: "jewellerywith_maheen",
      replyTime: "~1 hour",
      firstAutomationChoice: "FAQs, product details, availability, closed-hours messaging",
      status: "confirmed",
      quote: "Really needed.",
      takeaway: "Strongest positive data point — fast reply time correlates with zero lost sales.",
      counter: false,
    },
    {
      business: "ZayZaiwar",
      contact: "Shamoon",
      replyTime: "30 min – 1 hr",
      firstAutomationChoice: "Availability / product-lookup",
      status: "open",
      quote: "Managing a large audience really needs multiple people, not just better manual tools.",
      takeaway: "Independently confirms availability/product-lookup as the top automation priority; surfaces a headcount-scaling insight.",
      counter: false,
    },
  ],
  benchmarks: [
    { val: "15", label: "unique sellers engaged" },
    { val: "12", label: "survey responses (Jun 27–29, 2026)" },
    { val: "83%", label: "have lost a sale to slow replies" },
    { val: "67%", label: "rate the tool Very / Extremely Useful" },
    { val: "67%", label: "name Product Questions as first priority" },
    { val: "83%", label: "open to paying if time cut 50%+" },
    { val: "Rs. 500–1,000", label: "modal willingness to pay / month" },
    { val: "6", label: "confirmed early-access testers" },
  ],
  waitlist: [
    { contact: "Khadija Qureshi", business: "Stickersmania", status: "Confirmed — will test", cls: "confirmed" },
    { contact: "jewellerywith_maheen", business: "Jewellery with Maheen", status: "Confirmed — will test", cls: "confirmed" },
    { contact: "Shamoon", business: "ZayZaiwar", status: "Open to future contact", cls: "open" },
    { contact: "Eemaan Syed", business: "AP Crafts", status: "Maybe (per survey)", cls: "maybe" },
  ],
};

/* ---------- Shared chart colour system ---------- */
const C = {
  teal: "#147c74",
  tealLight: "#1c9b90",
  teal050: "#e6f4f2",
  teal700: "#0f5a55",
  terra: "#d9704e",
  terraDark: "#b8543a",
  ink: "#46595a",
  faint: "#a9b8b6",
  line: "#e2e8e6",
};

/* =====================================================================
   NAV
   ===================================================================== */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");

window.addEventListener("scroll", () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 20);
});

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

/* =====================================================================
   SCROLL REVEAL
   ===================================================================== */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* =====================================================================
   COUNT-UP STAT CHIPS
   ===================================================================== */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        countObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".chip__num[data-count]").forEach(el => countObserver.observe(el));

/* =====================================================================
   CHARTS
   ===================================================================== */
function labels(arr) { return arr.map(d => d.label); }
function counts(arr) { return arr.map(d => d.count); }

if (window.Chart) {
  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.color = C.ink;
  Chart.defaults.plugins.legend.display = false;

  const barBase = (extra = {}) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0b423f", padding: 10, cornerRadius: 8,
        callbacks: { label: ctx => ` ${ctx.parsed[extra.horizontal ? "x" : "y"]} of 12` },
      },
    },
    scales: extra.horizontal
      ? {
          x: { beginAtZero: true, ticks: { stepSize: 2, precision: 0 }, grid: { color: C.line }, border: { display: false } },
          y: { grid: { display: false }, border: { display: false } },
        }
      : {
          y: { beginAtZero: true, ticks: { stepSize: 2, precision: 0 }, grid: { color: C.line }, border: { display: false } },
          x: { grid: { display: false }, border: { display: false } },
        },
    ...extra.options,
  });

  const doughnutBase = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: { display: true, position: "bottom", labels: { boxWidth: 12, padding: 14, font: { size: 11 } } },
      tooltip: {
        backgroundColor: "#0b423f", padding: 10, cornerRadius: 8,
        callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} of 12` },
      },
    },
  };

  const chart = (id, config) => {
    const el = document.getElementById(id);
    if (el) new Chart(el, config);
  };

  // Daily inquiry volume — vertical bar
  chart("chartVolume", {
    type: "bar",
    data: { labels: labels(DATA.survey.dailyInquiryVolume), datasets: [{ data: counts(DATA.survey.dailyInquiryVolume), backgroundColor: C.teal, borderRadius: 8, maxBarThickness: 64 }] },
    options: barBase(),
  });

  // Time spent replying — vertical bar
  chart("chartTime", {
    type: "bar",
    data: { labels: labels(DATA.survey.timeSpentDailyReplying), datasets: [{ data: counts(DATA.survey.timeSpentDailyReplying), backgroundColor: C.tealLight, borderRadius: 8, maxBarThickness: 64 }] },
    options: barBase(),
  });

  // Lost sale — doughnut
  chart("chartLost", {
    type: "doughnut",
    data: { labels: labels(DATA.survey.lostSaleFromSlowReply), datasets: [{ data: counts(DATA.survey.lostSaleFromSlowReply), backgroundColor: [C.terra, C.terraDark, C.teal], borderColor: "#fff", borderWidth: 3 }] },
    options: doughnutBase,
  });

  // Perceived usefulness — horizontal bar
  chart("chartUseful", {
    type: "bar",
    data: { labels: labels(DATA.survey.perceivedUsefulness), datasets: [{ data: counts(DATA.survey.perceivedUsefulness), backgroundColor: [C.teal700, C.teal, C.tealLight, C.terra], borderRadius: 8, maxBarThickness: 34 }] },
    options: barBase({ horizontal: true, options: { indexAxis: "y" } }),
  });

  // First automation priority — horizontal bar
  chart("chartPriority", {
    type: "bar",
    data: { labels: labels(DATA.survey.firstAutomationPriority), datasets: [{ data: counts(DATA.survey.firstAutomationPriority), backgroundColor: DATA.survey.firstAutomationPriority.map((d, i) => (i === 0 ? C.terra : C.teal)), borderRadius: 8, maxBarThickness: 30 }] },
    options: barBase({ horizontal: true, options: { indexAxis: "y" } }),
  });

  // Willingness to pay — doughnut
  chart("chartPay", {
    type: "doughnut",
    data: { labels: labels(DATA.survey.willingnessToPay), datasets: [{ data: counts(DATA.survey.willingnessToPay), backgroundColor: [C.teal700, C.tealLight, C.terra, C.terraDark], borderColor: "#fff", borderWidth: 3 }] },
    options: doughnutBase,
  });

  // Price point — vertical bar
  chart("chartPrice", {
    type: "bar",
    data: { labels: labels(DATA.survey.pricePoint), datasets: [{ data: counts(DATA.survey.pricePoint), backgroundColor: DATA.survey.pricePoint.map((d, i) => (i === 1 ? C.terra : C.teal)), borderRadius: 8, maxBarThickness: 70 }] },
    options: barBase(),
  });

  // Early testing interest — doughnut
  chart("chartTesting", {
    type: "doughnut",
    data: { labels: labels(DATA.survey.earlyTestingInterest), datasets: [{ data: counts(DATA.survey.earlyTestingInterest), backgroundColor: [C.teal, C.tealLight], borderColor: "#fff", borderWidth: 3 }] },
    options: doughnutBase,
  });
}

/* =====================================================================
   INTERVIEW CARDS
   ===================================================================== */
const statusBadge = {
  confirmed: { cls: "badge--confirmed", text: "Confirmed tester" },
  maybe: { cls: "badge--maybe", text: "Maybe" },
  open: { cls: "badge--open", text: "Open to contact" },
};
const interviewGrid = document.getElementById("interviewGrid");
if (interviewGrid) {
  interviewGrid.innerHTML = DATA.interviews
    .map(i => {
      const b = statusBadge[i.status];
      return `
      <article class="icard reveal ${i.counter ? "icard--counter" : ""}">
        ${i.counter ? '<span class="counter-flag">⚠ Counter-signal</span>' : ""}
        <div class="icard__head">
          <div>
            <div class="icard__biz">${i.business}</div>
            <div class="icard__contact">${i.contact}</div>
          </div>
          <span class="badge ${b.cls}">${b.text}</span>
        </div>
        <p class="icard__quote">“${i.quote}”</p>
        <div class="icard__meta">
          <span class="pill">Reply time: <strong>${i.replyTime}</strong></span>
          <span class="pill">Automate first: <strong>${i.firstAutomationChoice}</strong></span>
        </div>
        <p class="icard__take">${i.takeaway}</p>
      </article>`;
    })
    .join("");
  interviewGrid.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

/* =====================================================================
   BENCHMARKS + WAITLIST
   ===================================================================== */
const benchStrip = document.getElementById("benchStrip");
if (benchStrip) {
  benchStrip.innerHTML = DATA.benchmarks
    .map(b => `<div class="bench"><div class="bench__val">${b.val}</div><div class="bench__label">${b.label}</div></div>`)
    .join("");
}

const waitlistBody = document.getElementById("waitlistBody");
if (waitlistBody) {
  waitlistBody.innerHTML = DATA.waitlist
    .map(w => `<tr><td>${w.contact}</td><td>${w.business}</td><td><span class="status-tag status-tag--${w.cls}">${w.status}</span></td></tr>`)
    .join("");
}

/* =====================================================================
   INTERACTIVE CHAT DEMO
   ===================================================================== */
const CATALOGUE = [
  { name: "Beaded Charm Bracelet", price: 650, stock: "in", keywords: ["bracelet", "charm", "beaded"] },
  { name: "Hoop Earrings (Gold-tone)", price: 900, stock: "low", keywords: ["earring", "hoop", "gold"] },
  { name: "Layered Pendant Necklace", price: 1200, stock: "in", keywords: ["necklace", "pendant", "layered"] },
  { name: "Cat Collar Charm", price: 450, stock: "out", keywords: ["collar", "cat", "charm"] },
];
const POLICIES = {
  delivery: "Free delivery in Lahore; Rs. 200 flat rate nationwide (2–4 working days).",
  returns: "7-day exchange on unworn pieces. Custom orders are non-refundable.",
  hours: "Open 11 AM – 8 PM, Mon–Sat. After-hours DMs get an instant auto-reply.",
  minOrder: "Minimum order Rs. 500; advance payment required on custom pieces.",
};
const STOCK_LABEL = { in: ["In stock", "in"], low: ["Low stock", "low"], out: ["Sold out", "out"] };

/* Render sample catalogue + policies in the side panel */
const catalogueList = document.getElementById("catalogueList");
if (catalogueList) {
  catalogueList.innerHTML = CATALOGUE.map(p => {
    const [txt, cls] = STOCK_LABEL[p.stock];
    return `<li>
      <span class="cat__name">${p.name}</span>
      <span class="cat__right">
        <span class="cat__price">Rs. ${p.price}</span>
        <span class="cat__stock cat__stock--${cls}">${txt}</span>
      </span>
    </li>`;
  }).join("");
}
const demoPolicies = document.getElementById("demoPolicies");
if (demoPolicies) {
  demoPolicies.innerHTML = `
    <div class="policy"><span class="policy__label">Delivery</span><span class="policy__val">${POLICIES.delivery}</span></div>
    <div class="policy"><span class="policy__label">Returns</span><span class="policy__val">${POLICIES.returns}</span></div>
    <div class="policy"><span class="policy__label">Hours</span><span class="policy__val">${POLICIES.hours}</span></div>
    <div class="policy"><span class="policy__label">Orders</span><span class="policy__val">${POLICIES.minOrder}</span></div>`;
}

/* Quick replies mirror the real top customer questions */
const QUICK_REPLIES = [
  "What's the price?",
  "Do you deliver outside the city?",
  "Is this in stock?",
  "What's your return policy?",
  "Are you open right now?",
  { label: "🛒 Place an order (COD)", order: true },
];

const thread = document.getElementById("thread");
const quickWrap = document.getElementById("quickReplies");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function scrollThread() { thread.scrollTop = thread.scrollHeight; }

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg msg--${type}`;
  div.textContent = text;
  thread.appendChild(div);
  scrollThread();
  return div;
}

function showTyping() {
  const t = document.createElement("div");
  t.className = "typing";
  t.innerHTML = "<span></span><span></span><span></span>";
  thread.appendChild(t);
  scrollThread();
  return t;
}

function botReply(text, delay = 850) {
  const typing = showTyping();
  return new Promise(resolve => {
    setTimeout(() => {
      typing.remove();
      addMessage(text, "bot");
      resolve();
    }, delay);
  });
}

/* Simple keyword matcher over the local catalogue + policies */
function generateReply(input) {
  const q = input.toLowerCase();

  // Product mentioned by name/keyword?
  const product = CATALOGUE.find(p => p.keywords.some(k => q.includes(k)) || q.includes(p.name.toLowerCase()));

  if (/(open|hours|timing|available now|right now|closed)/.test(q)) {
    return `${POLICIES.hours}`;
  }
  if (/(deliver|delivery|shipping|ship|courier|outside|city|nationwide)/.test(q)) {
    return `${POLICIES.delivery}`;
  }
  if (/(return|refund|exchange|replace)/.test(q)) {
    return `${POLICIES.returns}`;
  }
  if (/(stock|available|availability|in stock|left)/.test(q)) {
    if (product) {
      const [txt] = STOCK_LABEL[product.stock];
      return `${product.name} is currently: ${txt}.` + (product.stock === "out" ? " I can let you know as soon as it's restocked!" : "");
    }
    return "We currently have the Beaded Charm Bracelet and Layered Pendant Necklace in stock, Hoop Earrings are low, and the Cat Collar Charm is sold out. Which one caught your eye?";
  }
  if (/(price|cost|kitna|how much|rate|charges)/.test(q)) {
    if (product) return `${product.name} is Rs. ${product.price}. Would you like to place an order?`;
    const list = CATALOGUE.map(p => `• ${p.name} — Rs. ${p.price}`).join("\n");
    return `Here's our current pricing:\n${list}\n\n${POLICIES.minOrder}`;
  }
  if (product) {
    const [txt] = STOCK_LABEL[product.stock];
    return `${product.name} — Rs. ${product.price} (${txt}). Ask me about delivery, returns, or hours anytime!`;
  }
  if (/(hi|hello|salam|assalam|hey)/.test(q)) {
    return "Assalam-o-Alaikum! 👋 Welcome to Deosai Threads. Ask me about price, delivery, stock, returns, or our hours — or tap a quick reply below.";
  }
  return "I can help with price, delivery, availability, returns, and our business hours. Try one of the quick replies below, or name a product like \"pendant necklace\".";
}

let orderPlaced = false;

async function placeOrder() {
  addMessage("I'd like to order the Layered Pendant Necklace (COD).", "user");
  await botReply("Great choice! The Layered Pendant Necklace is Rs. 1,200. Confirming your Cash-on-Delivery order now… 📦", 900);
  const t = showTyping();
  setTimeout(() => {
    t.remove();
    addMessage(
      "✅ COD order auto-confirmed!\nOrder #DS-1042 · Layered Pendant Necklace · Rs. 1,200\nCash on delivery · ships in 2–4 days.\nReply CANCEL within 2 hrs to change your mind.",
      "bot"
    );
    addMessage("This confirmation was sent automatically — the second half of the wedge, working with zero seller effort.", "system");
    orderPlaced = true;
  }, 1000);
}

async function handleUserInput(text) {
  addMessage(text, "user");
  const reply = generateReply(text);
  await botReply(reply);
}

/* Build quick-reply buttons */
if (quickWrap) {
  QUICK_REPLIES.forEach(qr => {
    const btn = document.createElement("button");
    btn.className = "quick-btn" + (typeof qr === "object" && qr.order ? " quick-btn--order" : "");
    btn.type = "button";
    btn.textContent = typeof qr === "object" ? qr.label : qr;
    btn.addEventListener("click", () => {
      if (typeof qr === "object" && qr.order) placeOrder();
      else handleUserInput(qr);
    });
    quickWrap.appendChild(btn);
  });
}

if (chatForm) {
  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    handleUserInput(text);
  });
}

/* Greet on load */
if (thread) {
  addMessage("Assalam-o-Alaikum! 👋 I'm the Deosai auto-assistant. Ask me anything about our jewellery — price, delivery, stock, returns, or hours. Tap a quick reply to try me!", "bot");
}

/* Footer repo link placeholder */
const repoLink = document.getElementById("repoLink");
if (repoLink) {
  repoLink.addEventListener("click", e => {
    e.preventDefault();
    alert("Update this link to point to your repo's data folder (survey sheet + interview doc).");
  });
}
