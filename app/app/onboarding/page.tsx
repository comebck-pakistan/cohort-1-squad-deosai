"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import Link from "next/link";

// ============================================
// STEP 1: WELCOME
// ============================================
function Step1_Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 text-center shadow-sm">
      <div className="mb-6 text-5xl">🚀</div>
      <h2 className="font-display text-3xl tracking-tight text-ink mb-3">
        Welcome to Deosai Chat!
      </h2>
      <p className="text-ink-soft mb-6 text-lg">
        Let's set up your AI support agent.<br />
        <span className="text-sm">It only takes 5 minutes!</span>
      </p>
      <div className="rounded-xl border border-teal/20 bg-teal/5 p-4 mb-6 text-left space-y-2 text-sm text-ink-soft">
        <p>✅ No coding required</p>
        <p>✅ Connect your WhatsApp number</p>
        <p>✅ AI replies 24/7</p>
      </div>
      <Button onClick={onNext} className="w-full" size="lg">
        Start Setup →
      </Button>
    </div>
  );
}

// ============================================
// STEP 2: BUSINESS PROFILE
// ============================================
const categories = ["Jewellery", "Fashion", "Electronics", "Food", "Handicrafts", "Other"];

function Step2_BusinessProfile({ formData, updateFormData, onNext, onPrev }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.businessName && formData.category && formData.whatsappNumber) {
      onNext();
    }
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink mb-2">Business Profile 🏪</h2>
      <p className="text-ink-soft mb-6">Tell us about your store so the AI understands your context.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Business Name *</Label>
          <Input
            type="text"
            placeholder="e.g., Glam Jewellery"
            value={formData.businessName}
            onChange={(e) => updateFormData("businessName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Category *</Label>
          <Select
            value={formData.category}
            onChange={(e) => updateFormData("category", e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>WhatsApp Business Number *</Label>
          <Input
            type="tel"
            placeholder="e.g., +923001234567"
            value={formData.whatsappNumber}
            onChange={(e) => updateFormData("whatsappNumber", e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between mt-8 pt-4">
          <Button type="button" variant="outline" onClick={onPrev}>
            Back
          </Button>
          <Button type="submit">
            Continue →
          </Button>
        </div>
      </form>
    </div>
  );
}

// ============================================
// STEP 3: IMPORT CATALOGUE
// ============================================
function Step3_ImportCatalogue({ onNext, onPrev }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [method, setMethod] = useState<"upload" | "paste">("upload");

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink mb-2">Import Catalogue 📦</h2>
      <p className="text-ink-soft mb-6">How would you like to add your products?</p>
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${method === "upload" ? "bg-teal-soft/20 border-teal text-teal-bright" : "border-line text-ink-soft hover:bg-paper"}`}
          onClick={() => setMethod("upload")}
        >
          📤 Upload CSV/Excel
        </button>
        <button
          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${method === "paste" ? "bg-teal-soft/20 border-teal text-teal-bright" : "border-line text-ink-soft hover:bg-paper"}`}
          onClick={() => setMethod("paste")}
        >
          📋 Paste Product List
        </button>
      </div>
      {method === "upload" && (
        <div className="border-2 border-dashed border-line rounded-lg p-8 text-center bg-paper/50">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-ink-soft file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal/10 file:text-teal hover:file:bg-teal/20"
          />
          {file && <p className="mt-3 text-sm text-success">✅ {file.name}</p>}
        </div>
      )}
      {method === "paste" && (
        <Textarea
          className="w-full h-32"
          placeholder="Product 1, Rs. 500, In Stock&#10;Product 2, Rs. 750, Out of Stock"
        />
      )}
      <div className="flex justify-between mt-8 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 4: STORE POLICIES
// ============================================
function Step4_StorePolicies({ formData, updateFormData, onNext, onPrev }: any) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink mb-2">Store Policies 📋</h2>
      <p className="text-ink-soft mb-6">Define your rules so the AI gives accurate answers.</p>
      <div className="space-y-5">
        <div>
          <Label>Delivery Charges</Label>
          <Input
            type="text"
            placeholder="e.g., Rs. 150 (free above Rs. 2000)"
            value={formData.deliveryCharges}
            onChange={(e) => updateFormData("deliveryCharges", e.target.value)}
          />
        </div>
        <div>
          <Label>Delivery Time</Label>
          <Input
            type="text"
            placeholder="e.g., 2-3 business days"
            value={formData.deliveryTime}
            onChange={(e) => updateFormData("deliveryTime", e.target.value)}
          />
        </div>
        <div>
          <Label>Return Policy</Label>
          <Input
            type="text"
            placeholder="e.g., 7 days return"
            value={formData.returnPolicy}
            onChange={(e) => updateFormData("returnPolicy", e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between mt-8 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 5: AI PERSONALITY
// ============================================
const tones = ["Professional", "Friendly", "Casual", "Formal"];
const languages = ["Urdu + English", "Urdu", "English"];

function Step5_AIPersonality({ formData, updateFormData, onNext, onPrev }: any) {
  const preview = `"Ji bilkul! Pearl earrings are available for Rs. 1,200."`;

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink mb-2">AI Agent Personality 🤖</h2>
      <p className="text-ink-soft mb-6">How should your assistant sound?</p>
      <div className="space-y-5">
        <div>
          <Label>Agent Name</Label>
          <Input
            type="text"
            placeholder="e.g., Sara, Deosai Bot"
            value={formData.agentName}
            onChange={(e) => updateFormData("agentName", e.target.value)}
          />
        </div>
        <div>
          <Label>Tone</Label>
          <Select
            value={formData.tone}
            onChange={(e) => updateFormData("tone", e.target.value)}
          >
            {tones.map((t) => (
              <option key={t} value={t.toLowerCase()}>{t}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Language</Label>
          <Select
            value={formData.language}
            onChange={(e) => updateFormData("language", e.target.value)}
          >
            {languages.map((l) => (
              <option key={l} value={l.toLowerCase().replace(" + ", "-")}>{l}</option>
            ))}
          </Select>
        </div>
        <div className="rounded-xl border border-line bg-paper p-4">
          <p className="text-sm text-ink-soft mb-1">🔊 Preview</p>
          <p className="text-ink font-medium">{preview}</p>
        </div>
      </div>
      <div className="flex justify-between mt-8 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 6: CONNECT WHATSAPP
// ============================================
function Step6_ConnectWhatsApp({ formData, onNext, onPrev }: any) {
  const [connecting, setConnecting] = useState(false);

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 text-center shadow-sm">
      <h2 className="font-display text-2xl font-bold text-ink mb-2">Connect WhatsApp 📱</h2>
      <p className="text-ink-soft mb-6">Link your business number to start automating replies.</p>
      <div className="rounded-xl border border-line bg-paper p-6 mb-6">
        <p className="text-2xl font-bold text-ink">{formData.whatsappNumber || "+92 300 1234567"}</p>
      </div>
      <Button
        onClick={() => {
          setConnecting(true);
          setTimeout(() => { setConnecting(false); onNext(); }, 1500);
        }}
        disabled={connecting}
        className="w-full bg-success hover:bg-success/90 text-white"
        size="lg"
      >
        {connecting ? "Connecting..." : "Connect via Meta"}
      </Button>
      <div className="flex justify-between mt-8 pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
      </div>
    </div>
  );
}

// ============================================
// STEP 7: SUCCESS
// ============================================
function Step7_Success({ user, formData, onComplete }: any) {
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase
        .from("sellers")
        .update({
          business_name: formData.businessName,
          category: formData.category,
          phone: formData.whatsappNumber,
          delivery_charges: formData.deliveryCharges,
          delivery_time: formData.deliveryTime,
          return_policy: formData.returnPolicy,
          agent_name: formData.agentName,
          agent_tone: formData.tone,
          agent_language: formData.language,
          onboarded: true,
        })
        .eq("id", user.id);

      localStorage.setItem("onboardingData", JSON.stringify(formData));
      localStorage.setItem(`onboarded_${user.id}`, "true");
      localStorage.setItem("onboardingComplete", "true");

      // Wait for localStorage to save
      await new Promise(resolve => setTimeout(resolve, 100));

      onComplete();

    } catch (e) {
      console.warn("Error:", e);
    }
    setSaving(false);
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-8 text-center shadow-sm">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="font-display text-3xl font-bold text-ink mb-2">You're All Set!</h2>
      <p className="text-ink-soft mb-6">Your AI support agent is ready to go.</p>
      <Button
        onClick={handleFinish}
        disabled={saving}
        className="w-full"
        size="lg"
      >
        {saving ? "Saving..." : "Go to Dashboard →"}
      </Button>
    </div>
  );
}

// ============================================
// MAIN ONBOARDING PAGE
// ============================================
export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    whatsappNumber: "",
    deliveryCharges: "",
    deliveryTime: "",
    returnPolicy: "",
    agentName: "",
    tone: "friendly",
    language: "urdu-english",
    industry: "",
    website: "",
    roleDescription: "",
    companySize: "",
  });

  useEffect(() => {
    if (!authLoading && user && user.onboarded) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const prevStep = () => { if (step > 1) setStep(step - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleComplete = async () => {
    // Force onboarded flag in localStorage
    if (user) {
      localStorage.setItem(`onboarded_${user.id}`, "true");
      localStorage.setItem("onboardingComplete", "true");
    }

    // Small delay to ensure localStorage is set
    await new Promise(resolve => setTimeout(resolve, 100));

    // Hard redirect to dashboard
    window.location.href = "/dashboard";
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-paper text-ink-soft">Loading...</div>;

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/auth/login";
    return null;
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1_Welcome onNext={nextStep} />;
      case 2: return <Step2_BusinessProfile formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <Step3_ImportCatalogue onNext={nextStep} onPrev={prevStep} />;
      case 4: return <Step4_StorePolicies formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <Step5_AIPersonality formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 6: return <Step6_ConnectWhatsApp formData={formData} onNext={nextStep} onPrev={prevStep} />;
      case 7: return <Step7_Success user={user} formData={formData} onComplete={handleComplete} />;
      default: return null;
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-5 py-16">
      {/* Decorative blurs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-soft blur-3xl opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-marigold-soft blur-3xl opacity-60"
      />

      <div className="relative z-10 w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" aria-label="Back to home">
            <Logo />
          </Link>
          <div className="text-center">
            <h1 className="font-display text-3xl tracking-tight text-ink">
              Store Setup
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              Complete these steps to set up your store.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rounded-[var(--radius-card)] border border-line bg-card p-6 shadow-sm">
          <div className="flex justify-between text-sm text-ink-soft mb-3 font-medium">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-paper rounded-full h-2.5 border border-line overflow-hidden">
            <div className="bg-teal h-full rounded-full transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
}