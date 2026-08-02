import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="relative bg-[#0a1f3c] pt-20 pb-12 overflow-hidden text-paper">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal via-accent to-marigold" />
      
      <div className="mx-auto max-w-7xl px-5 relative z-10">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
            <div className="bg-white/10 rounded-xl p-1 inline-block mb-6">
              <Logo showText={false} />
            </div>
            <p className="text-xl font-display font-semibold mb-4">Deosai AI</p>
            <p className="text-sm text-paper/70 mb-6 max-w-xs">
              Built for the future of social selling. Enterprise-grade operations intelligence and automation for modern factories and sellers.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Product</h3>
            <ul className="space-y-3 text-sm text-paper/70">
              <li><Link href="#features" className="hover:text-teal-bright transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-teal-bright transition-colors">How it Works</Link></li>
              <li><Link href="#pricing" className="hover:text-teal-bright transition-colors">Pricing</Link></li>
              <li><Link href="#case-studies" className="hover:text-teal-bright transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-sm text-paper/70">
              <li><Link href="/privacy" className="hover:text-teal-bright transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-teal-bright transition-colors">Terms of Service</Link></li>
              <li><Link href="/whatsapp-api" className="hover:text-teal-bright transition-colors">WhatsApp API Guidelines</Link></li>
              <li><Link href="/security" className="hover:text-teal-bright transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Newsletter</h3>
            <p className="text-sm text-paper/70 mb-4">Stay updated with the latest features and operations tips.</p>
            <div className="flex bg-white/10 rounded-full p-1 border border-white/20 focus-within:border-teal-bright focus-within:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
              <input type="email" placeholder="Enter your email" className="bg-transparent border-none outline-none text-sm px-4 py-2 w-full text-white placeholder-paper/50" />
              <button className="bg-teal text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-teal-bright transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-paper/50">
          <p>© 2026 Deosai AI. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Built in Pakistan</span>
            <span className="w-1 h-1 rounded-full bg-teal-bright self-center"></span>
            <span>Squad Deosai · Cohort 1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
