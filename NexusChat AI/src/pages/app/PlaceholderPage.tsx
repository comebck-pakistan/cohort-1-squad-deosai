import React from 'react';
import { Bot } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

export function PlaceholderPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Card className="border-gray-800 bg-gray-900/50 max-w-md w-full p-8 border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-0 space-y-4">
          <div className="h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <Bot className="h-8 w-8 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-sm text-gray-400">{description}</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-xs font-medium text-gray-300">
            Frontend Mock Only
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
