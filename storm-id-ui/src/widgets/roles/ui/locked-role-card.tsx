"use client";

import { Badge } from "@/src/shared/components/ui/badge";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Lock } from "lucide-react";
import type { Role } from "@/src/features/roles/hooks/useRoles";

export function LockedRoleCard({ role }: { role: Role }) {
  const t = useTranslations();

  return (
    <div className="flex items-start gap-3 p-4 mb-2 rounded-xl border border-border bg-muted/50 opacity-55">
      <div className="pt-1 text-muted-foreground">
        <Lock className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-semibold text-muted-foreground truncate block">{role.name}</span>
        {(role.is_system || role.is_default) && (
          <div className="flex flex-wrap gap-1 mt-1">
            {role.is_system && (
              <Badge variant="secondary" className="text-xs">
                {t("roles.badge.system")}
              </Badge>
            )}
            {role.is_default && (
              <Badge variant="outline" className="text-xs">
                {t("roles.badge.default")}
              </Badge>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-1 mt-1">
          {role.permissions.map((p) => (
            <Badge key={p} variant="outline" className="text-xs text-muted-foreground">
              {p}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
