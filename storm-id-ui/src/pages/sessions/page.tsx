"use client";

import { useTranslations } from "@/src/shared/lib/i18n";
import { SessionsTable } from "@/src/widgets/sessions/ui/sessions-table";

export default function SessionsPage() {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("sessions.page.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("sessions.page.description")}</p>
      </div>
      <SessionsTable />
    </div>
  );
}
