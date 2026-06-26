"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/src/shared/components/ui/badge";
import { useTranslations } from "@/src/shared/lib/i18n";
import { GripVertical, Lock, Trash2, Shield } from "lucide-react";
import type { Role } from "@/src/features/roles/hooks/useRoles";

const ROLE_COLORS_FALLBACK: Record<string, string> = {
  "@owner": "#F1C40F",
  "@everyone": "#99AAB5",
};

interface SortableRoleItemProps {
  role: Role;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  canDelete: boolean;
  disabled?: boolean;
  canDrag?: boolean;
}

export function SortableRoleItem({
  role,
  isSelected,
  onSelect,
  onDelete,
  canDelete,
  disabled,
  canDrag = true,
}: SortableRoleItemProps) {
  const t = useTranslations();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: role.id,
    disabled: disabled || !canDrag,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const roleColor = role.color || ROLE_COLORS_FALLBACK[role.name] || "#99AAB5";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex w-full p-3 rounded-xl gap-2 border ${
        isSelected ? "bg-primary/10 border-primary/30" : "bg-card border-border hover:bg-accent/50"
      } transition-colors`}
    >
      <div
        {...attributes}
        {...listeners}
        className={`flex items-center p-1 rounded-md text-muted-foreground ${
          disabled ? "cursor-default" : "cursor-grab hover:bg-accent"
        }`}
      >
        {disabled ? (
          <Lock className="size-4" />
        ) : !canDrag ? (
          <Lock className="size-4" />
        ) : (
          <GripVertical className="size-4" />
        )}
      </div>
      <div
        className="flex items-center justify-between w-full cursor-pointer min-w-0 gap-2"
        onClick={onSelect}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Shield className="size-5 shrink-0" style={{ color: roleColor }} />
          <span className="font-medium truncate">{role.name}</span>
          {role.is_system && (
            <Badge variant="secondary" className="text-xs shrink-0">
              {t("roles.badge.system")}
            </Badge>
          )}
          {role.is_default && (
            <Badge variant="outline" className="text-xs shrink-0">
              {t("roles.badge.default")}
            </Badge>
          )}
        </div>
        {canDelete && !disabled && (
          <div
            className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
}
