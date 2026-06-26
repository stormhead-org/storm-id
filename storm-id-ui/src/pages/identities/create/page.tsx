"use client";

import { useSession } from "@/src/shared/hooks/useSession";
import { useTranslations } from "@/src/shared/lib/i18n";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import { CreateIdentityForm } from "@/src/widgets/identities/ui/create-identity-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/src/shared/components/ui/alert";

export default function CreateIdentityPage() {
  const t = useTranslations();
  const { session: profile } = useSession();
  const canCreate = matchPermission(profile?.permissions ?? [], "admin:users.create");

  if (!canCreate) {
    return (
      <div className="py-6">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{t("identities.create.noAccess")}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("identities.create.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("identities.create.description")}</p>
      </div>
      <CreateIdentityForm />
    </div>
  );
}
