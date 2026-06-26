"use client";

import { useTranslations } from "@/src/shared/lib/i18n";
import { AdminAppsTable } from "@/src/widgets/admin-apps/ui/admin-apps-table";

export default function AdminAppsPage() {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("adminApps.page.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("adminApps.page.description")}</p>
      </div>
      <AdminAppsTable />
    </div>
  );
}
