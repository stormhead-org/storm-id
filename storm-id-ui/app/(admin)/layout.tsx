import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/src/widgets/navigation/AdminHeader";
import { AdminSidebar } from "@/src/widgets/navigation/AdminSidebar";
import { Container } from "@/src/shared/components/Container";
import { getUserRoles, getRolePermissions } from "@/src/shared/lib/permissions";

const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("ory_kratos_session");

  if (!sessionCookie) {
    redirect("/login");
  }

  const sessionRes = await fetch(`${kratosPublicUrl}/sessions/whoami`, {
    headers: { Cookie: `ory_kratos_session=${sessionCookie.value}` },
    redirect: "manual",
  });

  if (!sessionRes.ok) {
    redirect("/login");
  }

  const sessionData = await sessionRes.json();
  const identityId = sessionData.identity?.id;

  if (identityId) {
    const roleIds = await getUserRoles(identityId);
    const perms = await getRolePermissions(roleIds);
    const hasAdminAccess = perms.some(p => p === "*" || p.startsWith("admin:"));
    if (!hasAdminAccess) {
      redirect("/welcome");
    }
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
