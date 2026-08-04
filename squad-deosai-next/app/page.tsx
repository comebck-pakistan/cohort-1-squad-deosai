import {
  SmoothScroll,
  Navbar,
  HeroSection,
  AgentsSection,
  WorkflowSection,
  FeaturesSection,
  PricingSection,
  FaqSection,
  CtaSection,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="font-landing min-h-screen bg-paper text-ink selection:bg-teal-soft selection:text-teal">
      <SmoothScroll>
        <Navbar />
        <main>
          <HeroSection />
          <AgentsSection />
          <WorkflowSection />
          <FeaturesSection />
          <PricingSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </SmoothScroll>
    </div>
  );
}

