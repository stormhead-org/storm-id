"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useAllOAuth2Clients,
  useDeleteOAuth2Client,
  type OAuth2Client,
} from "@/src/features/oauth2-clients/hooks/useOAuth2Clients";
import { useSession } from "@/src/shared/hooks/useSession";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Loader2, AlertCircle, Plus, Search, Eye, Trash2, Pencil, Server } from "lucide-react";

export function AdminAppsTable() {
  const t = useTranslations();
  const { data: clients, isLoading, error, refetch } = useAllOAuth2Clients();
  const { session: profile } = useSession();
  const deleteMutation = useDeleteOAuth2Client();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<OAuth2Client | null>(null);

  const canCreate = matchPermission(profile?.permissions ?? [], "admin:clients.create");
  const canManage = matchPermission(profile?.permissions ?? [], "admin:clients.manage");

  const filtered = (clients ?? []).filter((c) => {
    if (!debouncedSearch) return true;
    const q = debouncedSearch.toLowerCase();
    return c.client_name?.toLowerCase().includes(q) || c.client_id?.toLowerCase().includes(q);
  });

  const total = clients?.length ?? 0;
  const publicCount = clients?.filter((c) => c.token_endpoint_auth_method === "none").length ?? 0;
  const confidentialCount = total - publicCount;

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
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("adminApps.table.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("adminApps.table.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Server className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-muted-foreground">{t("adminApps.table.total")}</p>
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
              <p className="text-xs text-muted-foreground">{t("adminApps.table.typePublic")}</p>
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
              <p className="text-xs text-muted-foreground">
                {t("adminApps.table.typeConfidential")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={t("adminApps.table.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {canCreate && (
          <Button onClick={() => router.push("/clients/create")}>
            <Plus className="size-4 mr-1" />
            {t("adminApps.table.newApp")}
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Server className="size-8 mb-2" />
          <p>{search ? t("adminApps.table.noResults") : t("adminApps.table.noApps")}</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("adminApps.table.columns.name")}</TableHead>
              <TableHead>{t("adminApps.table.columns.clientId")}</TableHead>
              <TableHead>{t("adminApps.table.columns.type")}</TableHead>
              <TableHead>{t("adminApps.table.columns.owner")}</TableHead>
              <TableHead className="w-28"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => (
              <TableRow key={client.client_id}>
                <TableCell className="font-medium">
                  {client.client_name || t("adminApps.table.unnamed")}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {client.client_id.substring(0, 16)}...
                </TableCell>
                <TableCell>
                  <Badge
                    variant={client.token_endpoint_auth_method === "none" ? "secondary" : "default"}
                  >
                    {client.token_endpoint_auth_method === "none"
                      ? t("adminApps.table.public")
                      : t("adminApps.table.confidential")}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">
                  {client.owner ? client.owner.substring(0, 12) + "..." : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/clients/${client.client_id}`)}
                    >
                      <Eye className="size-4" />
                    </Button>
                    {canManage && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/clients/${client.client_id}/edit`)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setClientToDelete(client);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("adminApps.table.deleteDialog.title")}</DialogTitle>
            <DialogDescription>{t("adminApps.table.deleteDialog.description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t("adminApps.table.deleteDialog.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? t("adminApps.table.deleteDialog.deleting")
                : t("adminApps.table.deleteDialog.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
