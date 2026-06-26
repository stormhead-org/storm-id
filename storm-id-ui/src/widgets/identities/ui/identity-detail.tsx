"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useIdentity,
  useDeleteIdentity,
  useDeleteIdentitySessions,
  usePatchIdentity,
  usePatchIdentityState,
  useRecoverIdentity,
  type RecoveryCodeResponse,
} from "@/src/features/identities/hooks/useIdentities";
import { useIdentitySessions } from "@/src/features/sessions/hooks/useIdentitySessions";
import { useSession } from "@/src/shared/hooks/useSession";
import { useCopyToClipboard } from "@/src/shared/hooks/useCopyToClipboard";
import { useTranslations } from "@/src/shared/lib/i18n";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
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
  Trash2,
  User,
  Mail,
  Shield,
  Activity,
  Database,
  Eye,
  Pencil,
  CheckCircle2,
  Copy,
  KeyRound,
  RefreshCw,
} from "lucide-react";

interface IdentityDetailProps {
  identityId: string;
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
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

export function IdentityDetail({ identityId }: IdentityDetailProps) {
  const t = useTranslations();
  const { data: identity, isLoading, error, refetch } = useIdentity(identityId);
  const { session: profile } = useSession();
  const deleteMutation = useDeleteIdentity();
  const deleteSessionsMutation = useDeleteIdentitySessions();
  const patchIdentity = usePatchIdentity();
  const patchStateMutation = usePatchIdentityState();
  const recoverMutation = useRecoverIdentity();
  const { data: sessions } = useIdentitySessions(identityId);
  const { copy, copiedField } = useCopyToClipboard();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionsDialogOpen, setSessionsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [stateDialogOpen, setStateDialogOpen] = useState(false);
  const [recoverDialogOpen, setRecoverDialogOpen] = useState(false);
  const [recoverResult, setRecoverResult] = useState<RecoveryCodeResponse | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const canDelete = matchPermission(profile?.permissions ?? [], "admin:users.delete");
  const canEdit = matchPermission(profile?.permissions ?? [], "admin:users.edit");

  if (isLoading) {
    return <DetailSkeleton sections={6} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("identities.detail.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("identities.detail.retry")}
        </Button>
      </div>
    );
  }

  if (!identity) return null;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(identityId);
      router.push("/identities");
    } catch {
      toast.error(t("toasts.error.identityDeleteFailed"));
    }
  };

  const handleDeleteSessions = async () => {
    try {
      await deleteSessionsMutation.mutateAsync(identityId);
      setSessionsDialogOpen(false);
    } catch {
      toast.error(t("toasts.error.identitySessionsRevokeFailed"));
    }
  };

  const handleEdit = async () => {
    try {
      await patchIdentity.mutateAsync({
        id: identityId,
        data: { ...identity.traits, name: editName, email: editEmail },
      });
      setEditDialogOpen(false);
    } catch {
      toast.error(t("toasts.error.identityUpdateFailed"));
    }
  };

  const handleToggleState = async () => {
    try {
      const newState = identity.state === "active" ? "inactive" : "active";
      await patchStateMutation.mutateAsync({ id: identityId, state: newState });
      setStateDialogOpen(false);
    } catch {
      toast.error(t("toasts.error.identityStateFailed"));
    }
  };

  const handleRecover = async () => {
    try {
      const result = await recoverMutation.mutateAsync(identityId);
      setRecoverResult(result);
    } catch {
      toast.error(t("toasts.error.identityRecoverFailed"));
    }
  };

  const credTypes = identity.credentials ? Object.keys(identity.credentials) : [];

  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/identities")}>
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {identity.traits?.name || t("identities.detail.unknownName")}
          </h1>
          <p className="text-sm text-muted-foreground">{identity.traits?.email || identityId}</p>
        </div>
        <div className="flex items-center gap-2">
          {canEdit && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setEditName(identity.traits?.name || "");
                  setEditEmail(identity.traits?.email || "");
                  setEditDialogOpen(true);
                }}
              >
                <Pencil className="size-4 mr-1" />
                {t("identities.detail.edit")}
              </Button>
              <Button variant="outline" onClick={() => setRecoverDialogOpen(true)}>
                <RefreshCw className="size-4 mr-1" />
                {t("identities.detail.recover")}
              </Button>
              <Button variant="outline" onClick={() => setStateDialogOpen(true)}>
                {identity.state === "active"
                  ? t("identities.detail.deactivate")
                  : t("identities.detail.activate")}
              </Button>
            </>
          )}
          {canDelete && (
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              <Trash2 className="size-4 mr-1" />
              {t("identities.detail.delete")}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <Section
          title={t("identities.detail.identityId")}
          icon={<User className="size-5 text-primary" />}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("identities.detail.identityId")}
              </p>
              <p className="text-sm font-mono">{identity.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("identities.detail.state")}
              </p>
              <Badge variant={identity.state === "active" ? "default" : "secondary"}>
                {identity.state || "inactive"}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("identities.detail.schema")}
              </p>
              <p className="text-sm">{identity.schema_id || "default"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("identities.detail.created")}
              </p>
              <p className="text-sm">
                {identity.created_at ? new Date(identity.created_at).toLocaleString() : "—"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("identities.detail.updated")}
              </p>
              <p className="text-sm">
                {identity.updated_at ? new Date(identity.updated_at).toLocaleString() : "—"}
              </p>
            </div>
          </div>
        </Section>

        <Section
          title={t("identities.detail.email")}
          icon={<Mail className="size-5 text-primary" />}
        >
          <div className="grid grid-cols-2 gap-4">
            {identity.traits?.email && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("identities.detail.email")}
                </p>
                <p className="text-sm">{identity.traits.email}</p>
              </div>
            )}
            {identity.traits?.name && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("identities.detail.name")}
                </p>
                <p className="text-sm">{identity.traits.name}</p>
              </div>
            )}
          </div>
        </Section>

        <Section
          title={t("identities.detail.verified")}
          icon={<Shield className="size-5 text-primary" />}
        >
          {(identity.verifiable_addresses ?? []).length > 0 ? (
            <div className="space-y-2">
              {(identity.verifiable_addresses ?? []).map((addr) => (
                <div
                  key={addr.id}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <div>
                    <p className="text-sm">{addr.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("identities.detail.via", { via: addr.via })}
                    </p>
                  </div>
                  <Badge variant={addr.verified ? "default" : "secondary"}>
                    {addr.verified
                      ? t("identities.detail.verified")
                      : t("identities.detail.unverified")}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("identities.detail.noVerifiable")}</p>
          )}
        </Section>

        {(identity.metadata_public || identity.metadata_admin) && (
          <Section
            title={t("identities.detail.publicMetadata")}
            icon={<Database className="size-5 text-primary" />}
          >
            <div className="space-y-4">
              {identity.metadata_public && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("identities.detail.publicMetadata")}
                  </p>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(identity.metadata_public, null, 2)}
                  </pre>
                </div>
              )}
              {identity.metadata_admin && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("identities.detail.adminMetadata")}
                  </p>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(identity.metadata_admin, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </Section>
        )}

        {credTypes.length > 0 && (
          <Section
            title={t("identities.detail.identityId")}
            icon={<KeyRound className="size-5 text-primary" />}
          >
            <div className="space-y-2">
              {credTypes.map((type) => {
                const cred = identity.credentials?.[type];
                return (
                  <div
                    key={type}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg"
                  >
                    <div>
                      <Badge variant="outline" className="mb-1">
                        {type}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {cred?.identifiers?.join(", ") || "—"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        <Section
          title={t("identities.detail.sessions")}
          icon={<Activity className="size-5 text-primary" />}
        >
          {sessions && sessions.length > 0 ? (
            <div className="space-y-2">
              {sessions.slice(0, 5).map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono truncate">{s.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.authenticator_assurance_level?.toUpperCase() || "AAL1"} —{" "}
                      {new Date(s.authenticated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={s.active ? "default" : "secondary"}>
                    {s.active ? t("identities.detail.active") : t("identities.detail.inactive")}
                  </Badge>
                </div>
              ))}
              {sessions.length > 5 && (
                <p className="text-xs text-muted-foreground">
                  {t("identities.detail.moreSessions", { n: sessions.length - 5 })}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("identities.detail.noSessions")}</p>
          )}

          {canEdit && sessions && sessions.length > 0 && (
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSessionsDialogOpen(true)}
                disabled={deleteSessionsMutation.isPending}
              >
                <Trash2 className="size-4 mr-1" />
                {t("identities.detail.deleteAllSessions")}
              </Button>
            </div>
          )}
        </Section>

        <Section
          title={t("identities.detail.identityId")}
          icon={<Eye className="size-5 text-primary" />}
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0"
              onClick={() => copy(JSON.stringify(identity, null, 2), "raw-json")}
            >
              {copiedField === "raw-json" ? (
                <CheckCircle2 className="size-4 text-green-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
              {JSON.stringify(identity, null, 2)}
            </pre>
          </div>
        </Section>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("identities.detail.deleteUser")}</DialogTitle>
            <DialogDescription>{t("identities.detail.deleteUserConfirm")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t("identities.detail.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? t("identities.detail.deleting")
                : t("identities.detail.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={sessionsDialogOpen} onOpenChange={setSessionsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("identities.detail.deleteAllSessions")}</DialogTitle>
            <DialogDescription>{t("identities.detail.deleteAllSessionsConfirm")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSessionsDialogOpen(false)}>
              {t("identities.detail.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSessions}
              disabled={deleteSessionsMutation.isPending}
            >
              {deleteSessionsMutation.isPending
                ? t("identities.detail.deleting")
                : t("identities.detail.deleteAllSessionsAction")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("identities.detail.editUser")}</DialogTitle>
            <DialogDescription>{t("identities.detail.editUserDesc")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t("identities.detail.nameField")}</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">{t("identities.detail.emailField")}</Label>
              <Input
                id="edit-email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {t("identities.detail.cancel")}
            </Button>
            <Button onClick={handleEdit} disabled={patchIdentity.isPending}>
              {patchIdentity.isPending
                ? t("identities.detail.saving")
                : t("identities.detail.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={stateDialogOpen} onOpenChange={setStateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {identity.state === "active"
                ? t("identities.detail.deactivateUser")
                : t("identities.detail.activateUser")}
            </DialogTitle>
            <DialogDescription>
              {identity.state === "active"
                ? t("identities.detail.deactivateUserDesc")
                : t("identities.detail.activateUserDesc")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStateDialogOpen(false)}>
              {t("identities.detail.cancel")}
            </Button>
            <Button
              variant={identity.state === "active" ? "destructive" : "default"}
              onClick={handleToggleState}
              disabled={patchStateMutation.isPending}
            >
              {patchStateMutation.isPending
                ? t("identities.detail.saving")
                : identity.state === "active"
                  ? t("identities.detail.deactivate")
                  : t("identities.detail.activate")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={recoverDialogOpen}
        onOpenChange={(open) => {
          setRecoverDialogOpen(open);
          if (!open) setRecoverResult(null);
        }}
      >
        <DialogContent>
          {recoverResult ? (
            <>
              <DialogHeader>
                <DialogTitle>{t("identities.detail.recoveryCodeGenerated")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {t("identities.detail.recoveryLink")}
                  </Label>
                  <div className="mt-1 flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                    <code className="flex-1 truncate text-sm">{recoverResult.recovery_link}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0"
                      onClick={() => copy(recoverResult.recovery_link, "recovery_link")}
                    >
                      {copiedField === "recovery_link" ? (
                        <CheckCircle2 className="size-4 text-green-500" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    {t("identities.detail.recoveryCode")}
                  </Label>
                  <div className="mt-1 flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                    <code className="text-lg font-mono font-bold tracking-wider">
                      {recoverResult.recovery_code}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 shrink-0"
                      onClick={() => copy(recoverResult.recovery_code, "recovery_code")}
                    >
                      {copiedField === "recovery_code" ? (
                        <CheckCircle2 className="size-4 text-green-500" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("identities.detail.expiresAt", {
                    date: new Date(recoverResult.expires_at).toLocaleString(),
                  })}
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRecoverDialogOpen(false)}>
                  {t("identities.detail.close")}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{t("identities.detail.sendRecoveryLink")}</DialogTitle>
                <DialogDescription>
                  {t("identities.detail.recoveryLinkConfirm", {
                    email: identity.traits?.email || "the user's email",
                  })}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRecoverDialogOpen(false)}>
                  {t("identities.detail.cancel")}
                </Button>
                <Button onClick={handleRecover} disabled={recoverMutation.isPending}>
                  {recoverMutation.isPending
                    ? t("identities.detail.sending")
                    : t("identities.detail.sendRecoveryLink")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
