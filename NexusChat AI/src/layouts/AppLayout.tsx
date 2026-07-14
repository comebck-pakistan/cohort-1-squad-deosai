import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, Package, FileText, 
  Bot, ShoppingCart, Users, BarChart3, Settings, 
  CreditCard, HelpCircle, Bell, Search 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_USER } from '../data/mock';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Conversations', href: '/app/conversations', icon: MessageSquare },
  { name: 'Catalogue', href: '/app/catalogue', icon: Package },
  { name: 'Policies', href: '/app/policies', icon: FileText },
  { name: 'AI Agent', href: '/app/agent', icon: Bot },
  { name: 'Orders', href: '/app/orders', icon: ShoppingCart },
  { name: 'Handoff', href: '/app/handoff', icon: Users },
  { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/app/settings', icon: Settings },
  { name: 'Billing', href: '/app/billing', icon: CreditCard },
  { name: 'Help', href: '/app/help', icon: HelpCircle },
];

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#030712] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-[#030712] flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-violet-600 p-1 rounded-md">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-gray-100">NexusChat AI</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== '/app');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-500/10 text-blue-400" 
                    : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold text-xs">
              {MOCK_USER.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-200">{MOCK_USER.businessName}</span>
              <span className="text-xs text-gray-500">{MOCK_USER.plan} Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-gray-800 bg-[#030712]/80 backdrop-blur sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="h-9 w-full rounded-md border border-gray-700 bg-gray-900/50 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-200 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-gray-200 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#030712]" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI Agent Active
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
