import React, { useState } from 'react';
import { MOCK_CONVERSATIONS } from '../../data/mock';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Bot, User, Send, Package, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Conversations() {
  const [selectedConvId, setSelectedConvId] = useState(MOCK_CONVERSATIONS[0].id);
  const selectedConv = MOCK_CONVERSATIONS.find(c => c.id === selectedConvId);

  return (
    <div className="h-[calc(100vh-8rem)] flex rounded-xl border border-gray-800 bg-gray-900/30 overflow-hidden">
      {/* List */}
      <div className="w-full md:w-80 border-r border-gray-800 bg-gray-900/50 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Input placeholder="Search messages..." className="h-9" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConvId(conv.id)}
              className={cn(
                "w-full text-left p-4 border-b border-gray-800 transition-colors hover:bg-gray-800/50",
                selectedConvId === conv.id ? "bg-gray-800/80 border-l-2 border-l-blue-500" : ""
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-gray-200 text-sm">{conv.customerName}</span>
                <span className="text-xs text-gray-500">{conv.updatedAt}</span>
              </div>
              <p className="text-xs text-gray-400 truncate mb-2">{conv.lastMessage}</p>
              <Badge variant={conv.status === 'Handoff' ? 'warning' : 'ai'} className="text-[10px] py-0">
                {conv.status}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col hidden md:flex">
          <div className="h-16 border-b border-gray-800 p-4 flex items-center justify-between bg-gray-900/80">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                {selectedConv.customerName.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-200">{selectedConv.customerName}</h3>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  {selectedConv.channel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">AI Confidence: {selectedConv.confidence}%</Badge>
              {selectedConv.status === 'Handoff' && (
                <Button size="sm" variant="gradient">Take Over Chat</Button>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {selectedConv.messages.map((msg, idx) => (
              <div key={idx} className={cn("flex", msg.sender === 'customer' ? "justify-start" : msg.sender === 'system' ? "justify-center" : "justify-end")}>
                {msg.sender === 'system' ? (
                  <div className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {msg.text}
                  </div>
                ) : (
                  <div className={cn("flex gap-3 max-w-[70%]", msg.sender === 'customer' ? "flex-row" : "flex-row-reverse")}>
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0", 
                      msg.sender === 'customer' ? "bg-gray-800 text-gray-400" : "bg-gradient-to-br from-blue-500 to-violet-500 text-white"
                    )}>
                      {msg.sender === 'customer' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={cn(
                      "rounded-2xl p-4 text-sm shadow-sm",
                      msg.sender === 'customer' ? "bg-gray-800 text-gray-200 rounded-tl-sm" : "bg-blue-600 text-white rounded-tr-sm"
                    )}>
                      <p>{msg.text}</p>
                      <span className={cn("text-[10px] mt-2 block", msg.sender === 'customer' ? "text-gray-500" : "text-blue-200")}>{msg.time}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-800 bg-gray-900/80">
            <div className="flex gap-2 mb-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-800">Suggest Product</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-800">Send Payment Link</Badge>
            </div>
            <div className="relative">
              <Input placeholder="Type a message..." className="pr-12 bg-gray-900 border-gray-700" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-8 w-8 text-blue-400 hover:text-blue-300">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Context Panel */}
      {selectedConv && (
        <div className="w-72 border-l border-gray-800 bg-gray-900/50 hidden lg:block p-4">
          <h3 className="font-medium text-gray-200 mb-4">Customer Context</h3>
          
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Interested In</span>
              </div>
              <p className="text-sm text-gray-300">Pearl Drop Earrings</p>
              <p className="text-xs text-gray-500 mt-1">Rs. 1,850</p>
            </div>
            
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="flex items-center gap-2 text-violet-400 mb-2">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium">AI Insights</span>
              </div>
              <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                <li>Asked about availability</li>
                <li>Asked about colors</li>
                <li>High purchase intent</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
