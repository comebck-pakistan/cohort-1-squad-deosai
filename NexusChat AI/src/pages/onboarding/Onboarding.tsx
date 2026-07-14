import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle2, Bot, UploadCloud, MessageSquare } from 'lucide-react';

const STEPS = [
  'Welcome',
  'Business Profile',
  'Catalogue',
  'Policies',
  'AI Personality',
  'Connect WhatsApp',
  'Complete'
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { login, completeOnboarding } = useAppStore();

  const handleNext = () => {
    if (currentStep === STEPS.length - 1) {
      login();
      completeOnboarding();
      navigate('/app');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {STEPS.map((step, idx) => (
            <div key={step} className={`flex-1 h-1.5 mx-1 rounded-full ${idx <= currentStep ? 'bg-blue-500' : 'bg-gray-800'}`} />
          ))}
        </div>
        <p className="text-sm font-medium text-blue-400 text-center uppercase tracking-wider">{STEPS[currentStep]}</p>
      </div>

      <Card className="border-gray-800 bg-gray-900/80 backdrop-blur overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {currentStep === 0 && <WelcomeStep onNext={handleNext} />}
              {currentStep === 1 && <BusinessStep />}
              {currentStep === 2 && <CatalogueStep />}
              {currentStep === 3 && <PoliciesStep />}
              {currentStep === 4 && <AgentStep />}
              {currentStep === 5 && <WhatsAppStep />}
              {currentStep === 6 && <CompleteStep />}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-between items-center">
            <Button variant="ghost" onClick={handleBack}>Back</Button>
            <Button variant="gradient" onClick={handleNext}>Continue</Button>
          </div>
        )}
        
        {currentStep === STEPS.length - 1 && (
          <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-center items-center">
            <Button variant="gradient" size="lg" className="w-full" onClick={handleNext}>Go to Dashboard</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="h-16 w-16 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
        <Bot className="h-8 w-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Welcome to NexusChat AI</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Let's set up your AI support agent. It only takes about 5 minutes to configure your products, policies, and AI personality.
      </p>
      <Button size="lg" variant="gradient" onClick={onNext} className="px-8">
        Start Setup
      </Button>
    </div>
  );
}

function BusinessStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Business Profile</h2>
        <p className="text-gray-400">Tell us a bit about your store so the AI understands your context.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Business Name</label>
          <Input defaultValue="Ayesha's Wardrobe" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Category</label>
          <select className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <option>Fashion</option>
            <option>Jewellery</option>
            <option>Beauty</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">WhatsApp Business Number</label>
          <Input defaultValue="+92 300 1234567" />
        </div>
      </div>
    </div>
  );
}

function CatalogueStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Import Catalogue</h2>
        <p className="text-gray-400">How would you like to add your products?</p>
      </div>
      <div className="grid gap-4">
        <div className="border border-blue-500/50 bg-blue-500/10 rounded-xl p-4 flex gap-4 cursor-pointer">
          <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
            <UploadCloud className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-white">Upload CSV / Excel</h3>
            <p className="text-sm text-gray-400">Import your existing product list instantly.</p>
          </div>
        </div>
        <div className="border border-gray-700 bg-gray-800/30 rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-gray-800 transition-colors">
          <div className="h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
            <MessageSquare className="h-5 w-5 text-gray-300" />
          </div>
          <div>
            <h3 className="font-medium text-white">Paste Product List</h3>
            <p className="text-sm text-gray-400">Just paste text, our AI will organize it.</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 text-center">For this demo, we'll use a pre-loaded catalogue of 45 products.</p>
      </div>
    </div>
  );
}

function PoliciesStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Store Policies</h2>
        <p className="text-gray-400">Define your rules so the AI gives accurate answers.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Delivery Charges (Rs)</label>
          <Input defaultValue="250" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Delivery Time</label>
          <Input defaultValue="3-5 working days" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Return Policy</label>
          <textarea className="flex w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[80px]">
Returns accepted within 7 days for defective items only.
          </textarea>
        </div>
      </div>
    </div>
  );
}

function AgentStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Agent Personality</h2>
        <p className="text-gray-400">How should your assistant sound?</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Agent Name</label>
          <Input defaultValue="Sana" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Tone</label>
          <select className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <option>Professional yet friendly</option>
            <option>Warm Pakistani seller tone</option>
            <option>Short and direct</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Language Preference</label>
          <select className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <option>Mixed (Roman Urdu + English)</option>
            <option>English only</option>
            <option>Urdu script</option>
          </select>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gray-800 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-violet-500/20 flex items-center justify-center">
              <Bot className="h-4 w-4 text-violet-400" />
            </div>
            <span className="font-medium text-sm text-gray-200">Preview</span>
          </div>
          <p className="text-sm text-gray-300 italic">"Jee bilkul! The Pearl Earrings are available for Rs. 1,850. Should I confirm your order?"</p>
        </div>
      </div>
    </div>
  );
}

function WhatsAppStep() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-center py-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Connect WhatsApp</h2>
        <p className="text-gray-400">Link your business number to start automating replies.</p>
      </div>
      
      <div className="py-8">
        {connected ? (
          <div className="space-y-4">
            <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-medium text-emerald-400">Connected Successfully!</h3>
            <p className="text-gray-400 text-sm">Your number +92 300 1234567 is now linked.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 inline-block">
              <p className="text-lg font-medium text-white mb-1">+92 300 1234567</p>
              <p className="text-[#25D366] text-sm flex items-center justify-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                Ready to connect
              </p>
            </div>
            <div>
              <Button size="lg" className="bg-[#25D366] text-black hover:bg-[#20bd5a]" onClick={handleConnect} isLoading={connecting}>
                Connect via Meta
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500">Note: In this frontend demo, this is a simulated connection.</p>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="text-center py-8">
      <div className="h-20 w-20 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
        <CheckCircle2 className="h-10 w-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">You're All Set!</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        NexusChat AI is now ready to handle your customer DMs, answer questions, and confirm COD orders.
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-left">
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Products Sync</p>
          <p className="font-medium text-white text-sm">45 Items</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Agent Status</p>
          <p className="font-medium text-emerald-400 text-sm">Online</p>
        </div>
      </div>
    </div>
  );
}
