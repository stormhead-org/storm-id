"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useOAuth2Client,
  useDeleteOAuth2Client,
} from "@/src/features/oauth2-clients/hooks/useOAuth2Clients";
import { useSession } from "@/src/shared/hooks/useSession";
import { useTranslations } from "@/src/shared/lib/i18n";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import { useCopyToClipboard } from "@/src/shared/hooks/useCopyToClipboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { DetailSkeleton } from "@/src/shared/components/ui/skeletons";
import {
  AlertCircle,
  ArrowLeft,
  Copy,
  Trash2,
  Pencil,
  CheckCircle2,
  Globe,
  Shield,
  Key,
  Settings2,
  RefreshCw,
  Clock,
} from "lucide-react";

interface ClientDetailProps {
  clientId: string;
}

function Section({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const { copy, copiedField } = useCopyToClipboard();

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <code className="flex-1 p-2 bg-muted rounded text-sm break-all">{value}</code>
        <Button variant="ghost" size="icon" onClick={() => copy(value, label)}>
          {copiedField === label ? (
            <CheckCircle2 className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export function ClientDetail({ clientId }: ClientDetailProps) {
  const t = useTranslations();
  const { data: client, isLoading, error, refetch } = useOAuth2Client(clientId);
  const { session: profile } = useSession();
  const deleteMutation = useDeleteOAuth2Client();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerated, setRegenerated] = useState<string | null>(null);

  const canAdmin = matchPermission(profile?.permissions ?? [], "admin:clients.manage");
  const isOwner = client && client.owner && client.owner === profile?.identityId;
  const canManage = isOwner || canAdmin;
  const isPublicClient = client && client.token_endpoint_auth_method === "none";

  if (isLoading) {
    return <DetailSkeleton sections={5} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("clients.detail.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("clients.detail.retry")}
        </Button>
      </div>
    );
  }

  if (!client) return null;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(clientId);
      toast.success(t("toasts.success.clientDeleted"));
      router.push("/clients");
    } catch {
      toast.error(t("toasts.error.clientDeleteFailed"));
    }
  };

  const handleRegenerateSecret = async () => {
    setRegenerating(true);
    try {
      const res = await fetch(`/api/hydra-admin/clients/${clientId}/regenerate-secret`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to regenerate secret");
      const data = await res.json();
      setRegenerated(data.client_secret || "");
      toast.success(t("toasts.success.secretRegenerated"));
      refetch();
    } catch {
      toast.error(t("toasts.error.regenerateSecretFailed"));
    } finally {
      setRegenerating(false);
    }
  };

  const initials = (client.client_name || "App").slice(0, 2).toUpperCase();

  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/clients")}>
          <ArrowLeft className="size-5" />
        </Button>
        <Avatar className="size-10">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {client.client_name || t("clients.detail.unnamed")}
          </h1>
          <p className="text-sm text-muted-foreground">{client.client_id}</p>
        </div>
        {canManage && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/clients/${clientId}/edit`)}>
              <Pencil className="size-4 mr-1" />
              {t("clients.detail.edit")}
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              <Trash2 className="size-4 mr-1" />
              {t("clients.detail.delete")}
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Section
            title={t("clients.detail.basicInfo")}
            icon={<Shield className="size-5 text-primary" />}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.type")}
                </p>
                <Badge
                  variant={isPublicClient ? "secondary" : "default"}
                >
                  {isPublicClient
                    ? t("clients.list.typePublic")
                    : t("clients.list.typeConfidential")}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.authMethod")}
                </p>
                <p className="text-sm">
                  {client.token_endpoint_auth_method || "client_secret_basic"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.subjectType")}
                </p>
                <p className="text-sm">{client.subject_type || "public"}</p>
              </div>
              {client.owner && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("clients.detail.owner")}
                  </p>
                  <p className="text-sm font-mono">{client.owner}</p>
                </div>
              )}
            </div>
          </Section>

          <Section
            title={t("clients.detail.clientCredentials")}
            icon={<Key className="size-5 text-primary" />}
          >
            <div className="space-y-4">
              <CopyField label={t("clients.detail.clientId")} value={client.client_id} />
              {!isPublicClient && client.client_secret && !regenerated && (
                <CopyField label={t("clients.detail.clientSecret")} value={client.client_secret} />
              )}
              {!isPublicClient && regenerated && (
                <CopyField label={t("clients.detail.newSecret")} value={regenerated} />
              )}
              {!isPublicClient && canManage && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRegenerateSecret}
                    disabled={regenerating}
                  >
                    <RefreshCw className="size-4 mr-1" />
                    {regenerating
                      ? t("clients.detail.regenerating")
                      : t("clients.detail.regenerateSecret")}
                  </Button>
                </div>
              )}
            </div>
          </Section>

          <Section
            title={t("clients.detail.oauth2Config")}
            icon={<Settings2 className="size-5 text-primary" />}
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {t("clients.detail.grantTypes")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(client.grant_types || []).length > 0 ? (
                    (client.grant_types || []).map((gt) => (
                      <Badge key={gt} variant="outline">
                        {gt}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {t("clients.detail.none")}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {t("clients.detail.responseTypes")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(client.response_types || []).length > 0 ? (
                    (client.response_types || []).map((rt) => (
                      <Badge key={rt} variant="outline">
                        {rt}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {t("clients.detail.none")}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.scopes")}
                </p>
                <p className="text-sm">{client.scope || "—"}</p>
              </div>
            </div>
          </Section>

          <Section
            title={t("clients.detail.redirectUris")}
            icon={<Globe className="size-5 text-primary" />}
          >
            {(client.redirect_uris || []).length > 0 ? (
              <ul className="space-y-2">
                {(client.redirect_uris || []).map((uri) => (
                  <li key={uri} className="text-sm p-2 bg-muted rounded font-mono break-all">
                    {uri}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{t("clients.detail.noRedirectUris")}</p>
            )}
          </Section>

          {client.client_uri && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {t("clients.detail.clientUri")}
              </p>
              <p className="text-sm">{client.client_uri}</p>
            </div>
          )}

          {client.logo_uri && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {t("clients.detail.logoUri")}
              </p>
              <p className="text-sm">{client.logo_uri}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Section
            title={t("clients.detail.advanced")}
            icon={<Settings2 className="size-5 text-primary" />}
          >
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.subjectType2")}
                </p>
                <p className="text-sm">{client.subject_type || "public"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.authMethod2")}
                </p>
                <p className="text-sm">
                  {client.token_endpoint_auth_method || "client_secret_basic"}
                </p>
              </div>
              {client.userinfo_signed_response_alg && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("clients.detail.userinfoJwsAlg")}
                  </p>
                  <p className="text-sm">{client.userinfo_signed_response_alg}</p>
                </div>
              )}
              {client.backchannel_logout_uri && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("clients.detail.backchannelLogoutUri")}
                  </p>
                  <p className="text-sm font-mono">{client.backchannel_logout_uri}</p>
                </div>
              )}
            </div>
          </Section>

          <Section
            title={t("clients.detail.metadata")}
            icon={<Clock className="size-5 text-primary" />}
          >
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.created")}
                </p>
                <p className="text-sm">
                  {client.created_at ? new Date(client.created_at).toLocaleString() : "—"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("clients.detail.updated")}
                </p>
                <p className="text-sm">
                  {client.updated_at ? new Date(client.updated_at).toLocaleString() : "—"}
                </p>
              </div>
              {client.client_secret_expires_at && client.client_secret_expires_at > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("clients.detail.secretExpires")}
                  </p>
                  <p className="text-sm">
                    {new Date(client.client_secret_expires_at * 1000).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </Section>

          {client.metadata && Object.keys(client.metadata).length > 0 && (
            <Section
              title={t("clients.detail.customMetadata")}
              icon={<Settings2 className="size-5 text-primary" />}
            >
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                {JSON.stringify(client.metadata, null, 2)}
              </pre>
            </Section>
          )}
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("clients.detail.deleteDialog.title")}</DialogTitle>
            <DialogDescription>{t("clients.detail.deleteDialog.description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t("clients.detail.deleteDialog.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? t("clients.detail.deleteDialog.deleting")
                : t("clients.detail.deleteDialog.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
