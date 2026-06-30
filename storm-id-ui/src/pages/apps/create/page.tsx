"use client";

import { useState } from "react";
import { useSession } from "@/src/shared/hooks/useSession";
import { useTranslations } from "@/src/shared/lib/i18n";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  useCreateOAuth2Client,
  type OAuth2Client,
} from "@/src/features/oauth2-clients/hooks/useOAuth2Clients";
import { OAuth2ClientForm } from "@/src/features/oauth2-clients/components/OAuth2ClientForm";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/src/shared/components/ui/alert";

export default function CreateClientPage() {
  const t = useTranslations();
  const { session: profile } = useSession();
  const createMutation = useCreateOAuth2Client();
  const [createdClient, setCreatedClient] = useState<OAuth2Client | null>(null);

  const canCreate = matchPermission(profile?.permissions ?? [], "admin:clients.create");

  if (!canCreate) {
    return (
      <div className="py-6">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{t("clients.create.noAccess")}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleSubmit = async (data: {
    client_name: string;
    redirect_uris: string[];
    grant_types: string[];
    response_types: string[];
    scope: string;
    is_public: boolean;
    is_stormic?: boolean;
  }) => {
    const result = await createMutation.mutateAsync({
      client_name: data.client_name || undefined,
      redirect_uris: data.redirect_uris,
      grant_types: data.grant_types,
      response_types: data.response_types,
      scope: data.scope || undefined,
      token_endpoint_auth_method: data.is_public ? "none" : "client_secret_basic",
      owner: profile?.identityId,
      is_stormic: data.is_stormic,
    });
    setCreatedClient(result);
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t("clients.create.pageTitle")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("clients.create.pageDescription")}</p>
      </div>
      <OAuth2ClientForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        createdClient={createdClient}
      />
    </div>
  );
}
