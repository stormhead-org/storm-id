"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Check, Save } from "lucide-react";
import { cn } from "@/src/shared/lib/utils";
import type { Role } from "@/src/features/roles/hooks/useRoles";

const DEFAULT_COLOR = "#99AAB5";

const colorOptions = [
  "#1ABC9C",
  "#2ECC71",
  "#3498DB",
  "#9B59B6",
  "#E91E63",
  "#F1C40F",
  "#E67E22",
  "#E74C3C",
  "#95A5A6",
  "#607D8B",
  "#11806A",
  "#1F8B4C",
  "#206694",
  "#71368A",
  "#AD1457",
  "#C27C0E",
  "#A84300",
  "#992D22",
  "#979C9F",
  "#546E7A",
];

interface RoleVisualEditorProps {
  role: Role;
  isEveryone: boolean;
  isOwner?: boolean;
  readOnly?: boolean;
  onSave: (data: { name?: string; description?: string; color?: string }) => Promise<void>;
}

export function RoleVisualEditor({
  role,
  isEveryone,
  isOwner,
  readOnly,
  onSave,
}: RoleVisualEditorProps) {
  const t = useTranslations();
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [color, setColor] = useState(role.color || DEFAULT_COLOR);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(role.name);
    setDescription(role.description);
    setColor(role.color || DEFAULT_COLOR);
  }, [role.id, role.name, role.description, role.color]);

  const isSystemRole = isEveryone || isOwner;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updateData: { name?: string; description?: string; color?: string } = {};
      if (!isSystemRole) updateData.name = name;
      updateData.description = description;
      updateData.color = color;
      await onSave(updateData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="role-name">{t("roles.visual.nameLabel")}</Label>
        <Input
          id="role-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSystemRole || readOnly}
          placeholder={t("roles.visual.namePlaceholder")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role-desc">{t("roles.visual.descriptionLabel")}</Label>
        <Input
          id="role-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={readOnly}
          placeholder={t("roles.visual.descriptionPlaceholder")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role-color">{t("roles.visual.colorLabel")}</Label>
        <Input
          id="role-color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={readOnly}
          placeholder="#99AAB5"
        />
      </div>

      <div className="flex items-start gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div
            className={cn(
              "flex size-14 rounded-md cursor-pointer justify-center items-center border border-border",
              readOnly && "cursor-default opacity-60",
            )}
            style={{ backgroundColor: DEFAULT_COLOR }}
            onClick={() => !readOnly && setColor(DEFAULT_COLOR)}
            title={t("roles.visual.resetColor")}
          >
            {color === DEFAULT_COLOR && <Check className="size-6 text-white" />}
          </div>
          {color !== DEFAULT_COLOR && (
            <div
              className="size-14 rounded-md border border-border"
              style={{ backgroundColor: color }}
            />
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {colorOptions.map((c) => (
            <div
              key={c}
              className={cn(
                "size-6 rounded-md border border-border/50 transition-transform",
                readOnly ? "cursor-default opacity-60" : "cursor-pointer hover:scale-110",
              )}
              style={{ backgroundColor: c }}
              onClick={() => !readOnly && setColor(c)}
              title={c}
            />
          ))}
        </div>
      </div>

      {!readOnly && (
        <Button type="submit" disabled={saving} className="gap-2">
          <Save className="size-4" />
          {saving ? t("roles.visual.saving") : t("roles.visual.save")}
        </Button>
      )}
    </form>
  );
}
