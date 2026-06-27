import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/src/widgets/navigation/AdminHeader";
import { AdminSidebar } from "@/src/widgets/navigation/AdminSidebar";
import { Container } from "@/src/shared/components/Container";
import { KRATOS_SESSION_COOKIE } from "@/src/shared/constants/cookies";

const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(KRATOS_SESSION_COOKIE);

  if (!sessionCookie) {
    redirect("/login");
  }

  const sessionRes = await fetch(`${kratosPublicUrl}/sessions/whoami`, {
    headers: { Cookie: `${KRATOS_SESSION_COOKIE}=${sessionCookie.value}` },
    redirect: "manual",
  });

  if (!sessionRes.ok) {
    redirect("/login");
  }

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
