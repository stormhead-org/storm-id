"use client";

import { useTranslations } from "@/src/shared/lib/i18n";
import { MessagesTable } from "@/src/widgets/messages/ui/messages-table";

export default function MessagesPage() {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("messages.page.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("messages.page.description")}</p>
      </div>
      <MessagesTable />
    </div>
  );
}
