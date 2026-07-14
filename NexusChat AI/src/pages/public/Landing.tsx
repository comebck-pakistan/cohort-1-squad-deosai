import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { MessageSquare, Bot, Zap, Package, ShieldCheck, ArrowRight, Users } from 'lucide-react';

export function Landing() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 top-0 bg-[#030712] -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[100px] bg-gradient-to-b from-blue-600 to-violet-600 rounded-full -z-10" />
        
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
            NexusChat AI is now in Beta
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto"
          >
            Launch an AI WhatsApp Support Agent for Your <span className="gradient-text">Social Store</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            NexusChat AI helps sellers answer product, price, delivery, return, and order questions automatically — with a simple setup built for non-technical business owners.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto text-lg px-8">
                Build your AI agent today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8">
                View Demo
              </Button>
            </Link>
          </motion.div>
          
          {/* Hero Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-xl border border-gray-800 bg-[#0a0f1c] shadow-2xl overflow-hidden glass-panel aspect-[16/9] relative">
              <div className="absolute top-0 left-0 w-full h-12 bg-gray-900/80 border-b border-gray-800 flex items-center px-4 gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="pt-16 p-8 flex h-full">
                {/* Mockup Content */}
                <div className="w-1/3 border-r border-gray-800 pr-6 space-y-4">
                  <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                  <div className="space-y-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-16 rounded-lg bg-gray-800/50 p-3 flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-700" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-20 bg-gray-700 rounded" />
                          <div className="h-2 w-full bg-gray-700 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 pl-6 flex flex-col justify-end pb-8">
                   <div className="space-y-4">
                      <div className="self-start max-w-[70%] bg-gray-800 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300">
                        Hi, do you have the Pearl Drop Earrings in silver? And do you deliver to Lahore?
                      </div>
                      <div className="self-end max-w-[70%] ml-auto bg-blue-600 rounded-2xl rounded-tr-sm p-4 text-sm text-white">
                        Hello! Yes, the Pearl Drop Earrings are available in silver for Rs. 1,850. We deliver to Lahore within 3-5 working days. Would you like to place a COD order?
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0a0f1c] border-y border-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need to automate your social store</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Stop answering the same questions manually. Let NexusChat AI handle your DMs so you can focus on growing your business.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Bot />}
              title="AI Product Replies"
              desc="Automatically answers questions about price, sizes, colors, and availability based on your catalogue."
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Policy Aware"
              desc="Never copy-paste your return or delivery policies again. The AI handles it perfectly every time."
            />
            <FeatureCard 
              icon={<MessageSquare />}
              title="WhatsApp Ready"
              desc="Connects directly to your WhatsApp Business number to reply to customers instantly, 24/7."
            />
            <FeatureCard 
              icon={<Zap />}
              title="No-Code Setup"
              desc="Set up your AI agent in 5 minutes without writing a single line of code."
            />
            <FeatureCard 
              icon={<Package />}
              title="COD Confirmation"
              desc="Automatically confirm Cash on Delivery orders with customers to reduce return ratios."
            />
            <FeatureCard 
              icon={<Users />}
              title="Human Handoff"
              desc="When the AI isn't sure, it pauses the conversation and hands it over to you seamlessly."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] to-[#030712] -z-10" />
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to automate your DMs?</h2>
          <p className="text-xl text-gray-400 mb-10">Join hundreds of Pakistani social sellers saving hours every day with NexusChat AI.</p>
          <Link to="/signup">
            <Button size="lg" variant="gradient" className="text-lg px-10 py-6">
              Launch Your AI Agent Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
