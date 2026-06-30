"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/shared/hooks/useSession";
import {
  useAllOAuth2Clients,
  useDeleteOAuth2Client,
  type OAuth2Client,
} from "@/src/features/oauth2-clients/hooks/useOAuth2Clients";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { useTranslations } from "@/src/shared/lib/i18n";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Card, CardContent } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { StatCardsSkeleton, TableSkeleton } from "@/src/shared/components/ui/skeletons";
import {
  AlertCircle,
  Plus,
  Search,
  Eye,
  Trash2,
  Pencil,
  KeyRound,
  MoreHorizontal,
  ShieldCheck,
  Server,
} from "lucide-react";

export function ClientsList() {
  const t = useTranslations();
  const { session: profile } = useSession();
  const ownerId = profile?.identityId;
  const {
    data: clients,
    isLoading,
    error,
    refetch,
  } = useAllOAuth2Clients(ownerId || "", {
    enabled: !!ownerId,
  });
  const deleteMutation = useDeleteOAuth2Client();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<OAuth2Client | null>(null);

  const canManageAdmin = matchPermission(profile?.permissions ?? [], "admin:clients.manage");
  const canCreate = matchPermission(profile?.permissions ?? [], "admin:clients.create");

  const filtered = (clients ?? []).filter((c) => {
    if (!debouncedSearch) return true;
    const q = debouncedSearch.toLowerCase();
    return c.client_name?.toLowerCase().includes(q) || c.client_id?.toLowerCase().includes(q);
  });

  const total = clients?.length ?? 0;
  const publicCount = clients?.filter((c) => c.token_endpoint_auth_method === "none").length ?? 0;
  const confidentialCount = total - publicCount;
  const authCodeCount =
    clients?.filter((c) => c.grant_types?.includes("authorization_code")).length ?? 0;
  const stormicCount =
    clients?.filter((c) => (c.metadata as Record<string, unknown> | undefined)?.is_stormic === true)
      .length ?? 0;

  const handleDelete = async () => {
    if (!clientToDelete) return;
    try {
      await deleteMutation.mutateAsync(clientToDelete.client_id);
      toast.success(t("toasts.success.clientDeleted"));
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    } catch {
      toast.error(t("toasts.error.clientDeleteFailed"));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <StatCardsSkeleton count={4} />
        <TableSkeleton rows={6} cols={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("clients.list.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("clients.list.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <KeyRound className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-muted-foreground">{t("clients.list.total")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <div className="size-2.5 rounded-full bg-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{publicCount}</p>
              <p className="text-xs text-muted-foreground">{t("clients.list.public")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="size-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <div className="size-2.5 rounded-full bg-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{confidentialCount}</p>
              <p className="text-xs text-muted-foreground">{t("clients.list.confidential")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <ShieldCheck className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{authCodeCount}</p>
              <p className="text-xs text-muted-foreground">{t("clients.list.authCodeFlow")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Server className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{stormicCount}</p>
              <p className="text-xs text-muted-foreground">{t("clients.list.stormic")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={t("clients.list.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {canCreate && (
          <Button onClick={() => router.push("/apps/create")}>
            <Plus className="size-4 mr-1" />
            {t("clients.list.newApp")}
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <KeyRound className="size-8 mb-2" />
          <p>{search ? t("clients.list.noResults") : t("clients.list.noApps")}</p>
          {canCreate && !search && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => router.push("/apps/create")}
            >
              {t("clients.list.createFirst")}
            </Button>
          )}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("clients.list.columns.name")}</TableHead>
              <TableHead>{t("clients.list.columns.clientId")}</TableHead>
              <TableHead>{t("clients.list.columns.type")}</TableHead>
              <TableHead>{t("clients.list.columns.grantTypes")}</TableHead>
              <TableHead>{t("clients.list.columns.scopes")}</TableHead>
              <TableHead>{t("clients.list.columns.created")}</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => (
              <TableRow
                key={client.client_id}
                className="cursor-pointer"
                onClick={() => router.push(`/apps/${client.client_id}`)}
              >
                <TableCell className="font-medium">
                  {client.client_name || t("clients.list.unnamed")}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {client.client_id.substring(0, 16)}...
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant={
                        client.token_endpoint_auth_method === "none" ? "secondary" : "default"
                      }
                    >
                      {client.token_endpoint_auth_method === "none"
                        ? t("clients.list.typePublic")
                        : t("clients.list.typeConfidential")}
                    </Badge>
                    {(client.metadata as Record<string, unknown> | undefined)?.is_stormic ===
                      true && (
                      <Badge variant="outline" className="border-emerald-500 text-emerald-600">
                        {t("clients.list.typeStormic")}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(client.grant_types || []).length > 0 ? (
                      (client.grant_types || []).map((gt) => (
                        <Badge key={gt} variant="outline" className="text-xs">
                          {gt}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm max-w-[150px] truncate">
                  {client.scope || "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {client.created_at ? new Date(client.created_at).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/apps/${client.client_id}`)}>
                        <Eye className="size-4 mr-2" />
                        {t("clients.list.view")}
                      </DropdownMenuItem>
                      {(() => {
                        const isOwner = client.owner && client.owner === profile?.identityId;
                        const canManage = isOwner || canManageAdmin;
                        return (
                          canManage && (
                            <>
                              <DropdownMenuItem
                                onClick={() => router.push(`/apps/${client.client_id}/edit`)}
                              >
                                <Pencil className="size-4 mr-2" />
                                {t("clients.list.edit")}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  setClientToDelete(client);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="size-4 mr-2" />
                                {t("clients.list.delete")}
                              </DropdownMenuItem>
                            </>
                          )
                        );
                      })()}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("clients.list.deleteDialog.title")}</DialogTitle>
            <DialogDescription>{t("clients.list.deleteDialog.description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t("clients.list.deleteDialog.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? t("clients.list.deleteDialog.deleting")
                : t("clients.list.deleteDialog.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
