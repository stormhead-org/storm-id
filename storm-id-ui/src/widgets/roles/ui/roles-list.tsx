"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronRight, Shield, Trash2, Users, Plus, Lock } from "lucide-react";
import { Badge } from "@/src/shared/components/ui/badge";
import { useTranslations } from "@/src/shared/lib/i18n";
import type { Role } from "@/src/features/roles/hooks/useRoles";
import { useReorderRoles } from "@/src/features/roles/hooks/useRoles";
import { useSession } from "@/src/shared/hooks/useSession";
import { matchPermission } from "@/src/shared/lib/permission-utils";

interface RolesListProps {
  roles: Role[];
  onSelectRole: (role: Role) => void;
  onCreateRole: () => void;
  onDeleteRole: (roleId: string) => void;
  canManage: boolean;
}

function SortableRoleRow({
  role,
  onSelect,
  onDelete,
  canDelete,
  canDrag,
  isLocked,
}: {
  role: Role;
  onSelect: () => void;
  onDelete: () => void;
  canDelete: boolean;
  canDrag: boolean;
  isLocked?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: role.id,
    disabled: !canDrag,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-accent/50 transition-colors group"
    >
      {isLocked ? (
        <div className="flex items-center p-1 text-muted-foreground/50 shrink-0">
          <Lock className="size-4" />
        </div>
      ) : canDrag ? (
        <div
          {...attributes}
          {...listeners}
          className="flex items-center p-1 cursor-grab hover:bg-accent rounded-md text-muted-foreground shrink-0"
        >
          <GripVertical className="size-4" />
        </div>
      ) : null}
      <div
        className="flex items-center gap-3 min-w-0 flex-1 ml-2 cursor-pointer"
        onClick={onSelect}
      >
        <Shield className="size-5 shrink-0" style={{ color: role.color || "#99AAB5" }} />
        <span className="font-medium truncate">{role.name}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {canDelete && (
          <div
            className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg p-1 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="size-4" />
          </div>
        )}
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}

export function RolesList({
  roles,
  onSelectRole,
  onCreateRole,
  onDeleteRole,
  canManage,
}: RolesListProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const reorderRoles = useReorderRoles();
  const { maxPosition, permissions } = useSession();
  const isSuperAdmin = matchPermission(permissions, "admin:*");

  const everyoneRole = roles.find((r) => r.name === "@everyone");
  const ownerRole = roles.find((r) => r.is_system && !r.is_default);

  const sortedRoles = useMemo(() => [...roles].sort((a, b) => b.position - a.position), [roles]);

  const filteredRoles = sortedRoles.filter(
    (r) =>
      r.name !== "@everyone" &&
      !(r.is_system && !r.is_default) &&
      r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!canManage) return;
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = filteredRoles.findIndex((r) => r.id === active.id);
      const newIndex = filteredRoles.findIndex((r) => r.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const newSorted = [...filteredRoles];
      const [moved] = newSorted.splice(oldIndex, 1);
      newSorted.splice(newIndex, 0, moved);

      const orderedIds = newSorted
        .filter((r) => isSuperAdmin || r.position < maxPosition)
        .map((r) => r.id);
      reorderRoles.mutate(orderedIds);
    },
    [filteredRoles, reorderRoles, canManage, isSuperAdmin, maxPosition],
  );

  return (
    <div className="bg-card rounded-xl border border-border p-4 w-full">
      <p className="text-sm text-muted-foreground mb-4 text-justify">
        {t("roles.list.description")}
      </p>

      <div className="border-b-2 border-b-primary pb-3 mb-4">
        <h2 className="text-lg font-bold">{t("roles.list.title")}</h2>
      </div>

      {ownerRole && (
        <div
          className="flex items-center justify-between p-4 bg-muted rounded-xl mb-4 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => onSelectRole(ownerRole)}
        >
          <div className="flex items-center gap-3">
            <Lock className="size-6 text-muted-foreground" />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-base">@owner</p>
                <Badge variant="secondary" className="text-xs">
                  {t("roles.badge.system")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{t("roles.list.ownerDescription")}</p>
            </div>
          </div>
          <ChevronRight className="size-6 text-muted-foreground" />
        </div>
      )}

      {everyoneRole && (
        <div
          className="flex items-center justify-between p-4 bg-muted rounded-xl mb-4 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => onSelectRole(everyoneRole)}
        >
          <div className="flex items-center gap-3">
            <Users className="size-6 text-muted-foreground" />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-base">@everyone</p>
                <Badge variant="secondary" className="text-xs">
                  {t("roles.badge.system")}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {t("roles.badge.default")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{t("roles.list.everyoneDescription")}</p>
            </div>
          </div>
          <ChevronRight className="size-6 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input
          placeholder={t("roles.list.search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        {canManage && (
          <Button onClick={onCreateRole} className="shrink-0 gap-2">
            <Plus className="size-4" />
            {t("roles.list.newRole")}
          </Button>
        )}
      </div>

      <div className="flex items-center text-sm text-muted-foreground px-1 mb-2">
        <div className="flex-1">{t("roles.list.rolesCount", { count: filteredRoles.length })}</div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={filteredRoles.map((r) => r.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {filteredRoles.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                {t("roles.list.notFound")}
              </p>
            ) : (
              filteredRoles.map((role) => {
                const canDrag = canManage && (isSuperAdmin || role.position < maxPosition);
                const isLocked = canManage && !isSuperAdmin && role.position >= maxPosition;
                return (
                  <SortableRoleRow
                    key={role.id}
                    role={role}
                    onSelect={() => onSelectRole(role)}
                    onDelete={() => onDeleteRole(role.id)}
                    canDelete={canManage && (isSuperAdmin || role.position < maxPosition)}
                    canDrag={canDrag}
                    isLocked={isLocked}
                  />
                );
              })
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
