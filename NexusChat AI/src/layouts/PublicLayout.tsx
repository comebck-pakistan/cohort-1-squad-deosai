import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BotMessageSquare } from 'lucide-react';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#030712]/80 backdrop-blur supports-[backdrop-filter]:bg-[#030712]/60">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-violet-600 p-1.5 rounded-lg">
              <BotMessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">NexusChat AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">Start Free</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="border-t border-gray-800 bg-[#030712] py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} NexusChat AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
