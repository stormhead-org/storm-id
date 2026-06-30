"use client";

import { useSession } from "@/src/shared/hooks/useSession";
import { useTranslations } from "@/src/shared/lib/i18n";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import { Skeleton } from "@/src/shared/components/ui/skeleton";
import { Card, CardContent } from "@/src/shared/components/ui/card";
import { useRouter } from "next/navigation";
import { Fingerprint, KeyRound, UserCircle, ShieldHalf, LayoutDashboard } from "lucide-react";

interface QuickNavCard {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  requiredPermission?: string;
}

export function WelcomeContent() {
  const t = useTranslations();
  const { session, permissions, loading } = useSession();
  const router = useRouter();

  const quickNavCards: QuickNavCard[] = [
    {
      title: t("welcome.sessionInfo"),
      description: t("welcome.sessionInfoDesc"),
      path: "/sessions",
      icon: <Fingerprint className="size-6" />,
    },
    {
      title: t("welcome.myApplications"),
      description: t("welcome.myApplicationsDesc"),
      path: "/apps",
      icon: <KeyRound className="size-6" />,
    },
    {
      title: t("welcome.profile"),
      description: t("welcome.profileDesc"),
      path: "/profile",
      icon: <UserCircle className="size-6" />,
    },
    {
      title: t("welcome.manageRoles"),
      description: t("welcome.manageRolesDesc"),
      path: "/admin/roles",
      icon: <ShieldHalf className="size-6" />,
      requiredPermission: "admin:roles.view",
    },
    {
      title: t("welcome.dashboard"),
      description: t("welcome.dashboardDesc"),
      path: "/dashboard",
      icon: <LayoutDashboard className="size-6" />,
      requiredPermission: "admin:dashboard.view",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-5 space-y-2">
              <Skeleton className="size-6 rounded" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {t("welcome.greeting", { name: session?.name || "" })}
        </h1>
        <p className="text-muted-foreground mt-1">
          {session?.email
            ? t("welcome.signedInAs", { email: session.email })
            : t("welcome.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickNavCards
          .filter((card) => {
            if (!card.requiredPermission) return true;
            return matchPermission(permissions, card.requiredPermission);
          })
          .map((card) => (
            <Card
              key={card.title}
              className="cursor-pointer transition-colors hover:bg-accent/50"
              onClick={() => router.push(card.path)}
            >
              <CardContent className="flex items-start gap-4 p-5">
                <div className="mt-1 shrink-0 text-primary">{card.icon}</div>
                <div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{card.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
