"use client";

import { useTranslations } from "@/src/shared/lib/i18n";
import { ClientsList } from "@/src/widgets/clients/ui/clients-list";

export default function ClientsPage() {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("clients.page.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("clients.page.description")}</p>
      </div>
      <ClientsList />
    </div>
  );
}
