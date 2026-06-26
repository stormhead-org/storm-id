"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/avatar";
import { useTranslations } from "@/src/shared/lib/i18n";
import { CircleUser } from "lucide-react";

interface Identity {
  id: string;
  traits?: {
    email?: string;
    name?: string;
  };
}

interface RoleAddUserModalProps {
  open: boolean;
  onClose: () => void;
  identities: Identity[];
  onAdd: (userIds: string[]) => void;
}

export function RoleAddUserModal({ open, onClose, identities, onAdd }: RoleAddUserModalProps) {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = identities.filter((u) => {
    const name = u.traits?.name || u.traits?.email || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const toggleUser = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleAdd = () => {
    onAdd(selectedIds);
    setSelectedIds([]);
    setSearch("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("roles.addUser.title")}</DialogTitle>
          <DialogDescription>{t("roles.addUser.description")}</DialogDescription>
        </DialogHeader>
        <Input
          placeholder={t("roles.addUser.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="max-h-[40vh] overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {t("roles.addUser.notFound")}
            </p>
          ) : (
            filtered.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer"
                onClick={() => toggleUser(user.id)}
              >
                <Checkbox
                  checked={selectedIds.includes(user.id)}
                  onCheckedChange={() => toggleUser(user.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Avatar className="size-8">
                  <AvatarFallback>
                    <CircleUser className="size-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.traits?.name || "Unknown"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.traits?.email || ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("roles.addUser.cancel")}
          </Button>
          <Button onClick={handleAdd} disabled={selectedIds.length === 0}>
            {t("roles.addUser.add", { n: selectedIds.length })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
