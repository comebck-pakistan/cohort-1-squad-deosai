import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DemoModeProvider } from "@/lib/demo-mode";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoModeProvider>
      <DashboardShell>{children}</DashboardShell>
    </DemoModeProvider>
  );
}
