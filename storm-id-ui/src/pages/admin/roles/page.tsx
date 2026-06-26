"use client";

import { useTranslations } from "@/src/shared/lib/i18n";
import { RolesPageContent } from "@/src/widgets/roles/ui/roles-page-content";

export default function AdminRolesPage() {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("roles.page.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("roles.page.description")}</p>
      </div>
      <RolesPageContent />
    </div>
  );
}
