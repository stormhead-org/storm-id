"use client";

import { useTranslations } from "@/src/shared/lib/i18n";
import { TokensContent } from "@/src/widgets/tokens/ui/tokens-content";

export default function TokensPage() {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("tokens.page.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("tokens.page.description")}</p>
      </div>
      <TokensContent />
    </div>
  );
}
