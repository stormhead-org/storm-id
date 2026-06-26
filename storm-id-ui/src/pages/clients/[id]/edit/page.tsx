"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/src/shared/hooks/useSession";
import { useTranslations } from "@/src/shared/lib/i18n";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  useOAuth2Client,
  useUpdateOAuth2Client,
} from "@/src/features/oauth2-clients/hooks/useOAuth2Clients";
import { OAuth2ClientForm } from "@/src/features/oauth2-clients/components/OAuth2ClientForm";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/src/shared/components/ui/alert";

export default function EditClientPage() {
  const t = useTranslations();
  const params = useParams();
  const clientId = params?.id as string;

  if (!clientId) return null;

  const { session: profile } = useSession();
  const { data: client, isLoading } = useOAuth2Client(clientId);
  const updateMutation = useUpdateOAuth2Client();
  const router = useRouter();

  const canAdmin = matchPermission(profile?.permissions ?? [], "admin:clients.manage");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!client) return null;

  const isOwner = client.owner && client.owner === profile?.identityId;
  const canManage = isOwner || canAdmin;

  if (!canManage) {
    return (
      <div className="py-6">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{t("clients.edit.noAccess")}</AlertDescription>
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
  }) => {
    await updateMutation.mutateAsync({
      id: clientId,
      data: {
        client_name: data.client_name || undefined,
        redirect_uris: data.redirect_uris,
        grant_types: data.grant_types,
        response_types: data.response_types,
        scope: data.scope || undefined,
        token_endpoint_auth_method: data.is_public ? "none" : "client_secret_basic",
      },
    });
    router.push(`/clients/${clientId}`);
  };

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("clients.edit.pageTitle")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{client?.client_name || clientId}</p>
      </div>
      <OAuth2ClientForm
        initialData={client}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
      />
    </div>
  );
}
