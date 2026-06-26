"use client";

import { useTranslations } from "@/src/shared/lib/i18n";
import { IdentitiesTable } from "@/src/widgets/identities/ui/identities-table";

export default function IdentitiesPage() {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("identities.page.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("identities.page.description")}</p>
      </div>
      <IdentitiesTable />
    </div>
  );
}
