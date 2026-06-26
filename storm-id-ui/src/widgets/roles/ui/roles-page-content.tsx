"use client";

import { useState } from "react";
import { useTranslations } from "@/src/shared/lib/i18n";
import { toast } from "sonner";
import { RolesList } from "./roles-list";
import { RoleEditor } from "./role-editor";
import {
  useRoles,
  useCreateRole,
  useDeleteRole,
  type Role,
} from "@/src/features/roles/hooks/useRoles";
import { useSession } from "@/src/shared/hooks/useSession";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";

export function RolesPageContent() {
  const t = useTranslations();
  const { permissions } = useSession();
  const { data: roles, isLoading } = useRoles();
  const createRole = useCreateRole();
  const deleteRole = useDeleteRole();
  const [mode, setMode] = useState<"list" | "editor">("list");
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [deleteDialogRoleId, setDeleteDialogRoleId] = useState<string | null>(null);

  const canManage = matchPermission(permissions, "admin:roles.manage");

  if (!matchPermission(permissions, "admin:roles.view")) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted-foreground">{t("common.noAccess")}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  const handleSelectRole = (role: Role) => {
    setSelectedRoleId(role.id);
    setMode("editor");
  };

  const handleCreateRole = async () => {
    try {
      const result = await createRole.mutateAsync({
        name: t("roles.list.newRole"),
        description: "",
        permissions: [],
      });
      setSelectedRoleId(result.id);
      setMode("editor");
    } catch {
      toast.error(t("toasts.error.roleCreateFailed"));
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    setDeleteDialogRoleId(roleId);
  };

  const confirmDelete = async () => {
    if (!deleteDialogRoleId) return;
    try {
      await deleteRole.mutateAsync(deleteDialogRoleId);
      toast.success(t("toasts.success.roleDeleted"));
    } catch {
      toast.error(t("toasts.error.roleDeleteFailed"));
    } finally {
      setDeleteDialogRoleId(null);
    }
  };

  const roleToDelete = roles?.find((r) => r.id === deleteDialogRoleId);

  return (
    <>
      {mode === "editor" ? (
        <RoleEditor
          onBack={() => {
            setMode("list");
            setSelectedRoleId(null);
          }}
          initialRoleId={selectedRoleId}
        />
      ) : (
        <RolesList
          roles={roles || []}
          onSelectRole={handleSelectRole}
          onCreateRole={handleCreateRole}
          onDeleteRole={handleDeleteRole}
          canManage={canManage}
        />
      )}

      <Dialog
        open={!!deleteDialogRoleId}
        onOpenChange={(open) => !open && setDeleteDialogRoleId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("roles.editor.deleteDialog.title")}</DialogTitle>
            <DialogDescription>
              {t("roles.editor.deleteDialog.description", {
                name: roleToDelete?.name || deleteDialogRoleId || "",
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogRoleId(null)}>
              {t("roles.editor.deleteDialog.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteRole.isPending}>
              {deleteRole.isPending
                ? t("roles.editor.deleteDialog.deleting")
                : t("roles.editor.deleteDialog.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
