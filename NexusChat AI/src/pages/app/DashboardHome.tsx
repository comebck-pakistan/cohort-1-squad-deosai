import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MOCK_METRICS, MOCK_ORDERS, MOCK_CONVERSATIONS } from '../../data/mock';
import { MessageSquare, ShoppingCart, Clock, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back. Here's how your AI agent is performing.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Automated Replies" 
          value={MOCK_METRICS.automatedReplies} 
          icon={<MessageSquare className="h-4 w-4" />} 
          trend="+12% today" 
        />
        <MetricCard 
          title="Conversations Handled" 
          value={MOCK_METRICS.conversationsHandled} 
          icon={<Users className="h-4 w-4" />} 
          trend="+5% today" 
        />
        <MetricCard 
          title="Orders Confirmed" 
          value={MOCK_METRICS.ordersConfirmed} 
          icon={<ShoppingCart className="h-4 w-4" />} 
          trend="+18% today" 
        />
        <MetricCard 
          title="Est. Time Saved" 
          value={MOCK_METRICS.timeSaved} 
          icon={<Clock className="h-4 w-4" />} 
          trend="This week" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Conversations */}
        <Card className="lg:col-span-2 border-gray-800 bg-gray-900/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Conversations</CardTitle>
            <Link to="/app/conversations">
              <Button variant="ghost" size="sm">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_CONVERSATIONS.slice(0, 3).map((conv) => (
                <div key={conv.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 border border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-medium">
                      {conv.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">{conv.customerName}</p>
                      <p className="text-sm text-gray-400 truncate max-w-[200px] sm:max-w-[300px]">{conv.lastMessage}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500">{conv.updatedAt}</span>
                    <Badge variant={conv.status === 'Handoff' ? 'warning' : 'ai'}>
                      {conv.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setup & Quick Actions */}
        <div className="space-y-8">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-lg">Recent COD Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_ORDERS.slice(0, 2).map((order) => (
                  <div key={order.id} className="p-3 rounded-lg border border-gray-800 bg-gray-800/30">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-gray-200">{order.customerName}</span>
                      <span className="text-xs font-mono text-gray-500">{order.id}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{order.product} - Rs. {order.amount}</p>
                    <Badge variant={order.codStatus === 'Confirmed' ? 'success' : 'outline'} className="text-[10px]">
                      {order.codStatus}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link to="/app/orders">
                <Button variant="outline" className="w-full mt-4 text-xs h-8">Manage Orders</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend: string }) {
  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <div className="h-8 w-8 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold text-white">{value}</p>
          <span className="text-xs text-emerald-400 font-medium">{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}
