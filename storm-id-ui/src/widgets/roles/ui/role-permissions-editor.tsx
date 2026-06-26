"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Switch } from "@/src/shared/components/ui/switch";
import { Badge } from "@/src/shared/components/ui/badge";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Save, Search } from "lucide-react";
import { usePermissionCatalog } from "@/src/features/roles/hooks/useRoles";
import { matchPermission } from "@/src/shared/lib/permission-utils";
import { cn } from "@/src/shared/lib/utils";
import type { Role } from "@/src/features/roles/hooks/useRoles";

interface RolePermissionsEditorProps {
  role: Role;
  userPermissions: string[];
  readOnly?: boolean;
  onSave: (permissions: string[]) => Promise<void>;
}

export function RolePermissionsEditor({
  role,
  userPermissions,
  readOnly,
  onSave,
}: RolePermissionsEditorProps) {
  const t = useTranslations();
  const { data: catalog } = usePermissionCatalog();
  const [selectedPerms, setSelectedPerms] = useState<string[]>(role.permissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSelectedPerms(role.permissions);
  }, [role.id, role.permissions]);

  const isSuperAdmin = matchPermission(userPermissions, "admin:*");

  const togglePermission = (permId: string) => {
    setSelectedPerms((prev) =>
      prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId],
    );
  };

  const filteredCatalog = useMemo(() => {
    if (!catalog) return [];
    return catalog
      .map((group) => ({
        ...group,
        permissions: group.permissions.filter(
          (p) =>
            (isSuperAdmin || matchPermission(userPermissions, p.id)) &&
            p.label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((g) => g.permissions.length > 0);
  }, [catalog, userPermissions, isSuperAdmin, searchTerm]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(selectedPerms);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {t("roles.editor.editRole", { name: role.name })}
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={t("roles.editor.permissionsSearch")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSave} disabled={saving || readOnly} className="gap-2">
          <Save className="size-4" />
          {saving ? t("roles.visual.saving") : t("roles.visual.save")}
        </Button>
      </div>

      <div className="space-y-2 max-h-[50vh] overflow-y-auto">
        {filteredCatalog.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            {t("roles.editor.permissionsNotFound")}
          </p>
        ) : (
          filteredCatalog.map((group) => (
            <div key={group.group}>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{group.group}</Badge>
              </div>
              <div className="space-y-1">
                {group.permissions.map((perm) => (
                  <div
                    key={perm.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl bg-muted/50 transition-colors",
                      readOnly ? "cursor-default opacity-60" : "hover:bg-accent/50 cursor-pointer",
                    )}
                    onClick={() => !readOnly && togglePermission(perm.id)}
                  >
                    <span className="text-sm font-medium">{perm.label}</span>
                    <Switch
                      checked={selectedPerms.includes(perm.id)}
                      onCheckedChange={() => togglePermission(perm.id)}
                      disabled={readOnly}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
