import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AppLayout } from './layouts/AppLayout';
import { OnboardingLayout } from './layouts/OnboardingLayout';

// Public Pages
import { Landing } from './pages/public/Landing';
import { Login } from './pages/public/Login';
import { Signup } from './pages/public/Signup';

// Onboarding
import { Onboarding } from './pages/onboarding/Onboarding';

// App Pages
import { DashboardHome } from './pages/app/DashboardHome';
import { Conversations } from './pages/app/Conversations';
import { Catalogue } from './pages/app/Catalogue';
import { PlaceholderPage } from './pages/app/PlaceholderPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<PlaceholderPage title="Features" description="Learn about NexusChat AI capabilities." />} />
          <Route path="/pricing" element={<PlaceholderPage title="Pricing" description="View our flexible pricing plans." />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Onboarding */}
        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>

        {/* App Dashboard */}
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="policies" element={<PlaceholderPage title="Policies" description="Configure your store policies here." />} />
          <Route path="agent" element={<PlaceholderPage title="AI Agent" description="Configure your AI's personality and rules." />} />
          <Route path="orders" element={<PlaceholderPage title="Orders" description="Manage your confirmed COD orders." />} />
          <Route path="handoff" element={<PlaceholderPage title="Human Handoff" description="Answer complex questions the AI couldn't handle." />} />
          <Route path="analytics" element={<PlaceholderPage title="Analytics" description="View detailed performance charts." />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" description="Manage your account preferences." />} />
          <Route path="billing" element={<PlaceholderPage title="Billing" description="Manage your subscription plan." />} />
          <Route path="help" element={<PlaceholderPage title="Help Center" description="Get support for NexusChat AI." />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
