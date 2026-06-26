"use client";

import { cn } from "@/src/shared/lib/utils";
import { useSession } from "@/src/shared/hooks/useSession";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import { useTranslations } from "@/src/shared/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShieldHalf,
  Users,
  Mail,
  Server,
  UserCircle,
  Fingerprint,
  KeyRound,
} from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";

interface NavItem {
  titleKey: string;
  path: string;
  icon: React.ReactNode;
  requiredPermission?: string;
}

const userNavItems: NavItem[] = [
  { titleKey: "sidebar.overview", path: "/welcome", icon: <LayoutDashboard /> },
  { titleKey: "sidebar.sessionInfo", path: "/sessions", icon: <Fingerprint /> },
  { titleKey: "sidebar.myApplications", path: "/clients", icon: <KeyRound /> },
  { titleKey: "sidebar.profile", path: "/profile", icon: <UserCircle /> },
];

const adminNavItems: NavItem[] = [
  {
    titleKey: "sidebar.dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
    requiredPermission: "admin:dashboard.view",
  },
  {
    titleKey: "sidebar.manageUsers",
    path: "/identities",
    icon: <Users />,
    requiredPermission: "admin:users.view",
  },
  {
    titleKey: "sidebar.messages",
    path: "/messages",
    icon: <Mail />,
    requiredPermission: "admin:messages.*",
  },
  {
    titleKey: "sidebar.platformApps",
    path: "/admin/apps",
    icon: <Server />,
    requiredPermission: "admin:clients.view",
  },
  {
    titleKey: "sidebar.manageRoles",
    path: "/admin/roles",
    icon: <ShieldHalf />,
    requiredPermission: "admin:roles.view",
  },
  {
    titleKey: "sidebar.tokenInspector",
    path: "/tokens",
    icon: <KeyRound />,
    requiredPermission: "admin:clients.view",
  },
];

interface AdminSidebarProps {
  className?: string;
  onNavClick?: () => void;
}

export function AdminSidebar({ className, onNavClick }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { permissions, loading } = useSession();
  const t = useTranslations();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  const handleNav = (path: string) => {
    router.push(path);
    onNavClick?.();
  };

  const visibleAdminItems = adminNavItems.filter((item) => {
    if (!item.requiredPermission) return true;
    return matchPermission(permissions, item.requiredPermission);
  });

  const isAdmin = visibleAdminItems.length > 0;

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.path);
    const label = t(item.titleKey as any);
    return (
      <Button
        key={item.titleKey}
        variant="ghost"
        className={cn(
          "flex items-center gap-3 justify-start w-full h-12 px-4 text-base font-medium rounded-xl transition-all",
          active
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
        onClick={() => handleNav(item.path)}
      >
        <span className="size-5 shrink-0">{item.icon}</span>
        {label}
      </Button>
    );
  };

  if (loading) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <nav className={cn("space-y-1", className)}>
      {userNavItems.map(renderNavItem)}
      {isAdmin && (
        <>
          <div className="h-px bg-border my-3" />
          <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
            {t("sidebar.administration")}
          </p>
          {visibleAdminItems.map(renderNavItem)}
        </>
      )}
    </nav>
  );
}
