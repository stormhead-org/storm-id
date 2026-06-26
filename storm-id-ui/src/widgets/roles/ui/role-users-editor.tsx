"use client";

import { useState } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/avatar";
import { useTranslations } from "@/src/shared/lib/i18n";
import { CircleUser, X, Plus } from "lucide-react";
import { RoleAddUserModal } from "./role-add-user-modal";
import type { Role } from "@/src/features/roles/hooks/useRoles";

interface Identity {
  id: string;
  traits?: {
    email?: string;
    name?: string;
  };
}

interface RoleUsersEditorProps {
  role: Role;
  identities: Identity[];
  assignedUserIds: string[];
  onAssign: (roleIds: string[]) => Promise<void>;
  onUnassign: (userId: string) => Promise<void>;
}

export function RoleUsersEditor({
  role,
  identities,
  assignedUserIds,
  onAssign,
  onUnassign,
}: RoleUsersEditorProps) {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const assignedUsers = identities.filter((u) => assignedUserIds.includes(u.id));
  const filteredUsers = assignedUsers.filter((u) => {
    const name = u.traits?.name || u.traits?.email || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t("roles.users.title", { name: role.name })}</p>

      <div className="flex gap-2">
        <Input
          placeholder={t("roles.users.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="size-4" />
          {t("roles.users.add")}
        </Button>
      </div>

      <RoleAddUserModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        identities={identities.filter((u) => !assignedUserIds.includes(u.id))}
        onAdd={(userIds) => onAssign([...assignedUserIds, ...userIds])}
      />

      <div className="space-y-1">
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            {t("roles.users.notFound")}
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 rounded-xl bg-muted/50 hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="size-8">
                  <AvatarFallback>
                    <CircleUser className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{user.traits?.name || "Unknown"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.traits?.email || ""}
                  </p>
                </div>
              </div>
              <X
                className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive cursor-pointer transition-all shrink-0"
                onClick={() => onUnassign(user.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
