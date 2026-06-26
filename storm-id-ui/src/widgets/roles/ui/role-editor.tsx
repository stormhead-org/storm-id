"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/src/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { ChevronLeft, Plus } from "lucide-react";
import { SortableRoleItem } from "./sortable-role-item";
import { LockedRoleCard } from "./locked-role-card";
import { RoleVisualEditor } from "./role-visual-editor";
import { RolePermissionsEditor } from "./role-permissions-editor";
import { RoleUsersEditor } from "./role-users-editor";
import { useTranslations } from "@/src/shared/lib/i18n";
import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useReorderRoles,
} from "@/src/features/roles/hooks/useRoles";
import { useSession } from "@/src/shared/hooks/useSession";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import type { Role } from "@/src/features/roles/hooks/useRoles";

interface Identity {
  id: string;
  traits?: { email?: string; name?: string };
}

interface RoleEditorProps {
  onBack: () => void;
  initialRoleId?: string | null;
}

type EditorTab = "visual" | "permissions" | "users";

export function RoleEditor({ onBack, initialRoleId }: RoleEditorProps) {
  const t = useTranslations();
  const { permissions, maxPosition } = useSession();
  const queryClient = useQueryClient();
  const { data: roles, isLoading } = useRoles();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();
  const reorderRoles = useReorderRoles();

  const { data: identities } = useQuery<Identity[]>({
    queryKey: ["identities"],
    queryFn: () =>
      fetch("/api/keto/identities?page_size=250").then((r) => {
        if (!r.ok) throw new Error("Failed to fetch identities");
        return r.json();
      }),
  });

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<EditorTab>("visual");
  const [assignedUserIds, setAssignedUserIds] = useState<string[]>([]);
  const [deleteDialogRoleId, setDeleteDialogRoleId] = useState<string | null>(null);

  const isSuperAdmin = matchPermission(permissions, "admin:*");
  const canEditDefault = matchPermission(permissions, "admin:roles.default.manage") || isSuperAdmin;
  const canManage = matchPermission(permissions, "admin:roles.manage");
  const isPinnedRole = useCallback(
    (role: Role) => role.name === "@owner" || role.name === "@everyone",
    [],
  );

  const accessibleRoles = useMemo(
    () =>
      roles?.filter(
        (r) => !(!isSuperAdmin && r.position > maxPosition) && !(r.is_default && !canEditDefault),
      ) ?? [],
    [roles, isSuperAdmin, maxPosition, canEditDefault],
  );

  const accessibleIds = useMemo(
    () => new Set(accessibleRoles.filter((r) => !isPinnedRole(r)).map((r) => r.id)),
    [accessibleRoles, isPinnedRole],
  );

  const sortedRoles = useMemo(() => {
    if (!roles) return [];
    const result = [...roles].sort((a, b) => b.position - a.position);

    const ownerIdx = result.findIndex((r) => r.is_system && !r.is_default);
    if (ownerIdx > 0) {
      const [owner] = result.splice(ownerIdx, 1);
      result.unshift(owner);
    }

    const everyoneIdx = result.findIndex((r) => r.name === "@everyone");
    if (everyoneIdx >= 0 && everyoneIdx < result.length - 1) {
      const [everyone] = result.splice(everyoneIdx, 1);
      result.push(everyone);
    }

    return result;
  }, [roles]);

  // Select role by initialRoleId prop or @everyone by default
  const everyoneRole = sortedRoles.find((r) => r.name === "@everyone");
  const initialRoleApplied = useRef(false);
  const prevInitialRoleIdRef = useRef(initialRoleId);

  useEffect(() => {
    if (initialRoleId && prevInitialRoleIdRef.current !== initialRoleId) {
      prevInitialRoleIdRef.current = initialRoleId;
      initialRoleApplied.current = true;
      setSelectedRoleId(initialRoleId);
      return;
    }

    if (!initialRoleApplied.current) {
      if (initialRoleId) {
        setSelectedRoleId(initialRoleId);
      } else if (everyoneRole) {
        setSelectedRoleId(everyoneRole.id);
      }
      initialRoleApplied.current = true;
    }
  }, [initialRoleId, everyoneRole]);

  // Fetch assigned user IDs for selected role
  useEffect(() => {
    if (!selectedRoleId || !identities) {
      setAssignedUserIds([]);
      return;
    }
    const fetchAssignments = async () => {
      try {
        const ketoUrl =
          "/api/keto-read/relation-tuples?namespace=StormID&object=" +
          selectedRoleId +
          "&relation=member&max_depth=5";
        const res = await fetch(ketoUrl);
        if (!res.ok) {
          setAssignedUserIds([]);
          return;
        }
        const data = await res.json();
        const userIds: string[] = (data.relation_tuples || [])
          .filter((t: { relation: string }) => t.relation === "member")
          .map((t: { subject_id: string }) => t.subject_id);
        setAssignedUserIds(userIds);
      } catch {
        setAssignedUserIds([]);
      }
    };
    fetchAssignments();
  }, [selectedRoleId, identities]);

  const selectedRole = sortedRoles.find((r) => r.id === selectedRoleId);
  const isEveryoneRole = selectedRole?.name === "@everyone";
  const isOwnerRole = selectedRole?.is_system && !selectedRole?.is_default;

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!canManage) return;
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = sortedRoles.findIndex((r) => r.id === active.id);
      const newIndex = sortedRoles.findIndex((r) => r.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const newSorted = [...sortedRoles];
      const [moved] = newSorted.splice(oldIndex, 1);
      newSorted.splice(newIndex, 0, moved);

      const orderedIds = newSorted.filter((r) => accessibleIds.has(r.id)).map((r) => r.id);
      reorderRoles.mutate(orderedIds);
    },
    [sortedRoles, accessibleIds, reorderRoles, canManage],
  );

  const handleCreateRole = async () => {
    try {
      const result = await createRole.mutateAsync({
        name: "Новая роль",
        description: "",
        permissions: [],
      });
      queryClient.setQueryData<Role[]>(["admin-roles"], (old) =>
        old
          ? [
              ...old,
              {
                id: result.id,
                name: "Новая роль",
                description: "",
                is_system: false,
                is_default: false,
                position: 0,
                permissions: [],
                color: "#99AAB5",
              },
            ]
          : old,
      );
      setSelectedRoleId(result.id);
    } catch {
      toast.error(t("toasts.error.roleCreateFailed"));
    }
  };

  const handleUpdateRole = async (data: {
    name?: string;
    description?: string;
    permissions?: string[];
    color?: string;
  }) => {
    if (!selectedRole) return;
    try {
      await updateRole.mutateAsync({ id: selectedRole.id, ...data });
    } catch {
      toast.error(t("toasts.error.roleUpdateFailed"));
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    setDeleteDialogRoleId(roleId);
  };

  const confirmDelete = async () => {
    if (!deleteDialogRoleId) return;
    const currentIndex = sortedRoles.findIndex((r) => r.id === deleteDialogRoleId);
    const nextRole = currentIndex > 0 ? sortedRoles[currentIndex - 1] : everyoneRole;
    try {
      await deleteRole.mutateAsync(deleteDialogRoleId);
      queryClient.setQueryData<Role[]>(["admin-roles"], (old) =>
        old ? old.filter((r) => r.id !== deleteDialogRoleId) : old,
      );
      if (nextRole) setSelectedRoleId(nextRole.id);
    } catch {
      toast.error(t("toasts.error.roleDeleteFailed"));
    } finally {
      setDeleteDialogRoleId(null);
    }
  };

  const roleToDelete = sortedRoles.find((r) => r.id === deleteDialogRoleId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted-foreground">{t("roles.editor.loading")}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4 w-full">
      <div className="flex gap-4">
        {/* Left panel - role list */}
        <div className="hidden lg:block lg:w-1/3">
          <div className="flex items-center justify-between mb-3">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
              onClick={onBack}
            >
              <ChevronLeft className="size-5" />
              <span className="text-sm font-medium">{t("roles.editor.back")}</span>
            </div>
            {canManage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCreateRole}
                disabled={createRole.isPending}
              >
                <Plus className="size-4" />
              </Button>
            )}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedRoles.map((r) => r.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {sortedRoles.map((role) =>
                  isPinnedRole(role) || (role.position >= maxPosition && !isSuperAdmin) ? (
                    <SortableRoleItem
                      key={role.id}
                      role={role}
                      isSelected={selectedRoleId === role.id}
                      onSelect={() => setSelectedRoleId(role.id)}
                      onDelete={() => {}}
                      canDelete={false}
                      disabled
                    />
                  ) : accessibleIds.has(role.id) ? (
                    <SortableRoleItem
                      key={role.id}
                      role={role}
                      isSelected={selectedRoleId === role.id}
                      onSelect={() => setSelectedRoleId(role.id)}
                      onDelete={() => handleDeleteRole(role.id)}
                      canDelete={canManage && !role.is_system}
                      canDrag={canManage}
                    />
                  ) : (
                    <LockedRoleCard key={role.id} role={role} />
                  ),
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Right panel - role editor */}
        <div className="w-full lg:w-2/3">
          {/* Mobile: back + create */}
          <div className="flex items-center justify-between mb-3 lg:hidden">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
              onClick={onBack}
            >
              <ChevronLeft className="size-5" />
              <span className="text-sm font-medium">{t("roles.editor.back")}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleCreateRole} disabled={!canManage}>
              <Plus className="size-4 mr-1" />
              {t("roles.editor.newRole")}
            </Button>
          </div>

          {selectedRole ? (
            <>
              <p className="text-lg font-semibold mb-3">
                {t("roles.editor.editRole", { name: selectedRole.name })}
              </p>

              {/* Tab bar */}
              <div className="flex gap-4 border-b border-border mb-4">
                <button
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    editorTab === "visual"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setEditorTab("visual")}
                >
                  {t("roles.editor.visual")}
                </button>
                <button
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    editorTab === "permissions"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setEditorTab("permissions")}
                >
                  {t("roles.editor.permissions")}
                </button>
                {!isEveryoneRole && !isOwnerRole && (
                  <button
                    className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                      editorTab === "users"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setEditorTab("users")}
                  >
                    {t("roles.editor.members")}
                  </button>
                )}
                {(isEveryoneRole || isOwnerRole) && (
                  <span className="pb-2 text-sm text-muted-foreground">
                    {t("roles.editor.members")}
                  </span>
                )}
              </div>

              {/* Editor content */}
              {editorTab === "visual" && (
                <RoleVisualEditor
                  role={selectedRole}
                  isEveryone={isEveryoneRole}
                  isOwner={isOwnerRole}
                  readOnly={!canManage}
                  onSave={handleUpdateRole}
                />
              )}

              {editorTab === "permissions" && !isOwnerRole && (
                <RolePermissionsEditor
                  role={selectedRole}
                  userPermissions={permissions}
                  readOnly={!canManage || (selectedRole.position >= maxPosition && !isSuperAdmin)}
                  onSave={async (newPerms) => {
                    await handleUpdateRole({ permissions: newPerms });
                  }}
                />
              )}

              {editorTab === "permissions" && isOwnerRole && (
                <p className="text-sm text-muted-foreground py-4">
                  {t("roles.editor.ownerPermissionsLocked")}
                </p>
              )}

              {editorTab === "users" && !isEveryoneRole && !isOwnerRole && (
                <RoleUsersEditor
                  role={selectedRole}
                  identities={identities || []}
                  assignedUserIds={assignedUserIds}
                  onAssign={async (userIds) => {
                    try {
                      for (const userId of userIds) {
                        const res = await fetch(`/api/admin/role-assignments?subject_id=${userId}`);
                        const data = res.ok ? await res.json() : { roles: [] };
                        const currentRoles = data.roles || [];
                        if (!currentRoles.includes(selectedRole.id)) {
                          currentRoles.push(selectedRole.id);
                        }
                        await fetch("/api/admin/role-assignments", {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ subject_id: userId, role_ids: currentRoles }),
                        });
                      }
                      setAssignedUserIds((prev) => [...new Set([...prev, ...userIds])]);
                    } catch {
                      toast.error(t("toasts.error.roleAssignFailed"));
                    }
                  }}
                  onUnassign={async (userId) => {
                    try {
                      await fetch(
                        `/api/admin/role-assignments?subject_id=${userId}&role=${selectedRole.id}`,
                        { method: "DELETE" },
                      );
                      setAssignedUserIds((prev) => prev.filter((id) => id !== userId));
                    } catch {
                      toast.error(t("toasts.error.roleUnassignFailed"));
                    }
                  }}
                />
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">
              {t("roles.editor.selectRole")}
            </p>
          )}
        </div>
      </div>

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
    </div>
  );
}
