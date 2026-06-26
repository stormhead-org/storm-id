import { AdminHeader } from "@/src/widgets/navigation/AdminHeader";
import { AdminSidebar } from "@/src/widgets/navigation/AdminSidebar";
import { Container } from "@/src/shared/components/Container";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <Container>
        <div className="lg:flex lg:gap-2">
          <aside className="hidden py-4 lg:no-scrollbar lg:block lg:h-[calc(100vh-4rem)] lg:w-1/4 lg:overflow-auto">
            <AdminSidebar />
          </aside>
          <main className="w-full lg:no-scrollbar lg:h-[calc(100vh-4rem)] lg:w-3/4 lg:overflow-auto">
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
}
