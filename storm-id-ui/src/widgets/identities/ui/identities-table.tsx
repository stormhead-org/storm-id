"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/shared/hooks/useSession";
import {
  useIdentities,
  useDeleteIdentity,
  usePatchIdentityState,
} from "@/src/features/identities/hooks/useIdentities";
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
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import { TableSkeleton } from "@/src/shared/components/ui/skeletons";
import { AlertCircle, Plus, Search, Users } from "lucide-react";
import { BulkOperationDialog } from "./BulkOperationDialog";

export function IdentitiesTable() {
  const t = useTranslations();
  const { session: profile } = useSession();
  const { data: identities, isLoading, error, refetch } = useIdentities();
  const deleteMutation = useDeleteIdentity();
  const patchStateMutation = usePatchIdentityState();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDialog, setBulkDialog] = useState<{
    open: boolean;
    operation: "activate" | "deactivate" | "delete";
  }>({ open: false, operation: "activate" });

  const canCreate = matchPermission(profile?.permissions ?? [], "admin:users.create");
  const canDelete = matchPermission(profile?.permissions ?? [], "admin:users.delete");
  const canEdit = matchPermission(profile?.permissions ?? [], "admin:users.edit");

  const filtered = useMemo(() => {
    if (!debouncedSearch) return identities ?? [];
    const q = debouncedSearch.toLowerCase();
    return (identities ?? []).filter(
      (i) =>
        i.traits?.email?.toLowerCase().includes(q) ||
        i.traits?.name?.toLowerCase().includes(q) ||
        i.id?.toLowerCase().includes(q),
    );
  }, [identities, debouncedSearch]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((i) => i.id)));
    }
  };

  const handleBulkAction = async (id: string) => {
    if (bulkDialog.operation === "delete") {
      await deleteMutation.mutateAsync(id);
    } else {
      await patchStateMutation.mutateAsync({
        id,
        state: bulkDialog.operation === "activate" ? "active" : "inactive",
      });
    }
  };

  if (isLoading) {
    return <TableSkeleton rows={8} cols={6} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("identities.table.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("identities.table.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={t("identities.table.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <p className="text-sm text-muted-foreground ml-auto">
          {t("identities.table.count", { n: identities?.length ?? 0 })}
        </p>
        {canCreate && (
          <Button onClick={() => router.push("/identities/create")}>
            <Plus className="size-4 mr-1" />
            {t("identities.table.newUser")}
          </Button>
        )}
      </div>

      {selected.size > 0 && (
        <div className="flex items-center gap-2 mb-4 p-2 bg-muted rounded-lg flex-wrap">
          <span className="text-sm text-muted-foreground">
            {t("identities.table.selected", { n: selected.size })}
          </span>
          {canEdit && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBulkDialog({ open: true, operation: "activate" })}
              >
                {t("identities.table.activate")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBulkDialog({ open: true, operation: "deactivate" })}
              >
                {t("identities.table.deactivate")}
              </Button>
            </>
          )}
          {canDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setBulkDialog({ open: true, operation: "delete" })}
            >
              {t("identities.table.delete")}
            </Button>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Users className="size-8 mb-2" />
          <p>{search ? t("identities.table.noResults") : t("identities.table.noUsers")}</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                {(canDelete || canEdit) && (
                  <Checkbox
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                )}
              </TableHead>
              <TableHead>{t("identities.table.columns.name")}</TableHead>
              <TableHead>{t("identities.table.columns.email")}</TableHead>
              <TableHead>{t("identities.table.columns.status")}</TableHead>
              <TableHead>{t("identities.table.columns.verified")}</TableHead>
              <TableHead>{t("identities.table.columns.schema")}</TableHead>
              <TableHead>{t("identities.table.columns.created")}</TableHead>
              <TableHead>{t("identities.table.columns.updated")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((identity) => (
              <TableRow
                key={identity.id}
                className="cursor-pointer"
                onClick={() => router.push(`/identities/${identity.id}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {(canDelete || canEdit) && (
                    <Checkbox
                      checked={selected.has(identity.id)}
                      onCheckedChange={() => toggleSelect(identity.id)}
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{identity.traits?.name || "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {identity.traits?.email || "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={identity.state === "active" ? "default" : "secondary"}>
                    {identity.state || "inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {identity.verifiable_addresses?.some((a) => a.verified) ? (
                    <Badge variant="default">{t("identities.table.badges.verified")}</Badge>
                  ) : (
                    <Badge variant="secondary">{t("identities.table.badges.unverified")}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {identity.schema_id ? (
                    <Badge variant="outline" className="text-xs font-mono">
                      {identity.schema_id}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {identity.created_at ? new Date(identity.created_at).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {identity.updated_at ? new Date(identity.updated_at).toLocaleDateString() : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <BulkOperationDialog
        open={bulkDialog.open}
        onOpenChange={(open) => setBulkDialog((prev) => ({ ...prev, open }))}
        identities={[...selected]}
        operation={bulkDialog.operation}
        onExecute={handleBulkAction}
        label={
          bulkDialog.operation === "delete"
            ? t("identities.table.bulk.deleteUsers")
            : bulkDialog.operation === "activate"
              ? t("identities.table.bulk.activateUsers")
              : t("identities.table.bulk.deactivateUsers")
        }
      />
    </div>
  );
}
