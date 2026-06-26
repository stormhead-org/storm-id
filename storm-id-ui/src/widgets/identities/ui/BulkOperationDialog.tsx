"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface BulkOperationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  identities: string[];
  operation: "activate" | "deactivate" | "delete";
  onExecute: (id: string) => Promise<unknown>;
  label: string;
}

export function BulkOperationDialog({
  open,
  onOpenChange,
  identities,
  operation,
  onExecute,
  label,
}: BulkOperationDialogProps) {
  const t = useTranslations();
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ id: string; success: boolean }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const run = useCallback(async () => {
    setIsRunning(true);
    setProgress(0);
    setResults([]);

    const collected: { id: string; success: boolean }[] = [];

    for (let i = 0; i < identities.length; i++) {
      try {
        await onExecute(identities[i]);
        collected.push({ id: identities[i], success: true });
        setResults([...collected]);
      } catch {
        collected.push({ id: identities[i], success: false });
        setResults([...collected]);
      }
      setProgress(i + 1);
    }

    const successCount = collected.filter((r) => r.success).length;
    const failCount = collected.filter((r) => !r.success).length;

    const bulkSuccessKeys: Record<string, string> = {
      delete: "toasts.success.identitiesBulkDeleted",
      activate: "toasts.success.identitiesBulkActivated",
      deactivate: "toasts.success.identitiesBulkDeactivated",
    };

    if (failCount === 0) {
      toast.success(t(bulkSuccessKeys[operation], { count: successCount }));
    } else {
      toast.error(t("toasts.error.generic"));
    }

    setCompleted(true);
    setIsRunning(false);
  }, [identities, onExecute, t, operation]);

  useEffect(() => {
    if (open && identities.length > 0) {
      setProgress(0);
      setResults([]);
      setCompleted(false);
    }
  }, [open, identities]);

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;

  const dialogTitleMap: Record<string, string> = {
    delete: t("identities.table.bulk.deleteUsers"),
    activate: t("identities.table.bulk.activateUsers"),
    deactivate: t("identities.table.bulk.deactivateUsers"),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitleMap[operation]}</DialogTitle>
          <DialogDescription>
            {t("identities.table.bulk.description", { label, n: identities.length })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{
                  width: `${identities.length > 0 ? (progress / identities.length) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="text-sm text-muted-foreground shrink-0">
              {progress}/{identities.length}
            </span>
          </div>

          {results.length > 0 && (
            <div className="max-h-48 overflow-y-auto space-y-1">
              {results.map((r) => (
                <div key={r.id} className="flex items-center gap-2 text-sm">
                  {r.success ? (
                    <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="size-4 text-destructive shrink-0" />
                  )}
                  <span className="font-mono text-xs truncate">{r.id}</span>
                </div>
              ))}
            </div>
          )}

          {completed && (
            <p className="text-sm text-muted-foreground">
              {failCount > 0
                ? t("identities.table.bulk.succeededWith", { n: successCount, failed: failCount })
                : t("identities.table.bulk.succeeded", { n: successCount })}
            </p>
          )}
        </div>

        <DialogFooter>
          {!isRunning && !completed && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("identities.table.bulk.cancel")}
            </Button>
          )}
          {!isRunning && !completed && (
            <Button onClick={run}>{t("identities.table.bulk.start")}</Button>
          )}
          {completed && (
            <Button onClick={() => onOpenChange(false)}>{t("identities.table.bulk.close")}</Button>
          )}
          {isRunning && (
            <Button disabled>
              <Loader2 className="size-4 mr-1 animate-spin" />
              {t("identities.table.bulk.processing")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
