"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/src/shared/hooks/useSession";
import { useIdentitySessions } from "@/src/features/sessions/hooks/useIdentitySessions";
import { useTranslations } from "@/src/shared/lib/i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { TableSkeleton } from "@/src/shared/components/ui/skeletons";
import { RefreshCw, AlertCircle, AlertTriangle } from "lucide-react";

interface Session {
  id: string;
  active: boolean;
  authenticated_at: string;
  issued_at: string;
  expires_at: string;
  authenticator_assurance_level?: "aal1" | "aal2" | "aal3";
  identity?: {
    id: string;
    traits?: Record<string, unknown>;
  };
  devices?: Array<{ ip_address?: string; user_agent?: string; location?: string }>;
}

function getTimeRemaining(expiresAt: string) {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry.getTime() - now.getTime();
  if (diff <= 0) return "expired";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return { key: "remainingDays", values: { n: days, h: hours } };
  if (hours > 0) return { key: "remainingHours", values: { n: hours, m: minutes } };
  return { key: "remainingMinutes", values: { n: minutes } };
}

function getIdentityDisplay(session: Session) {
  if (!session.identity) return "Unknown";
  const traits = session.identity.traits as Record<string, string> | undefined;
  if (!traits) return session.identity.id;
  return traits.email || (traits.name as string) || session.identity.id;
}

export function SessionsTable() {
  const t = useTranslations();
  const router = useRouter();
  const { session: profile } = useSession();
  const { data: sessions, isLoading, error, refetch } = useIdentitySessions(profile?.identityId);

  if (isLoading) {
    return <TableSkeleton rows={5} cols={5} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("sessions.table.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("sessions.table.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {t("sessions.table.count", { n: sessions?.length ?? 0 })}
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="size-4 mr-1" />
          {t("sessions.table.refresh")}
        </Button>
      </div>

      {!sessions || sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p>{t("sessions.table.noSessions")}</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("sessions.table.columns.identity")}</TableHead>
              <TableHead>{t("sessions.table.columns.status")}</TableHead>
              <TableHead>{t("sessions.table.columns.aal")}</TableHead>
              <TableHead>{t("sessions.table.columns.authenticated")}</TableHead>
              <TableHead>{t("sessions.table.columns.expires")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((s) => {
              const timeInfo = getTimeRemaining(s.expires_at);
              const isExpiringSoon =
                typeof timeInfo === "object" && timeInfo.key === "remainingMinutes";
              return (
                <TableRow
                  key={s.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/sessions/${s.id}`)}
                >
                  <TableCell className="text-sm font-medium">{getIdentityDisplay(s)}</TableCell>
                  <TableCell>
                    <Badge variant={s.active ? "default" : "secondary"}>
                      {s.active
                        ? t("sessions.table.status.active")
                        : t("sessions.table.status.inactive")}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {s.authenticator_assurance_level?.toUpperCase() || "AAL1"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(s.authenticated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="flex items-center gap-1">
                      {isExpiringSoon && <AlertTriangle className="size-3 text-warning" />}
                      {typeof timeInfo === "string"
                        ? t("sessions.table.expired")
                        : timeInfo
                          ? t(
                              `sessions.table.${timeInfo.key}`,
                              timeInfo.values as unknown as Record<string, string | number | Date>,
                            )
                          : t("sessions.table.unknown")}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
