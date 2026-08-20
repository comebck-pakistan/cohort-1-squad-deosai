import { AdminShell } from "@/components/admin/AdminShell";
import { DemoModeProvider } from "@/lib/demo-mode";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoModeProvider>
      <AdminShell>{children}</AdminShell>
    </DemoModeProvider>
  );
}
