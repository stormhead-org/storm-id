"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useSession,
  useDisableSession,
  useExtendSession,
} from "@/src/features/sessions/hooks/useSession";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Separator } from "@/src/shared/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import { DetailSkeleton } from "@/src/shared/components/ui/skeletons";
import {
  AlertCircle,
  ArrowLeft,
  Info,
  User,
  Shield,
  Smartphone,
  Trash2,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface SessionDetailProps {
  sessionId: string;
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function formatDateTime(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString();
}

function getTimeRemaining(expiresAt?: string) {
  if (!expiresAt) return null;
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry.getTime() - now.getTime();
  if (diff <= 0) return "expired";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return { key: "remaining", values: { n: days, h: hours } };
  if (hours > 0) return { key: "remainingHours", values: { n: hours, m: minutes } };
  return { key: "remainingMinutes", values: { n: minutes } };
}

function getIdentityDisplay(session: {
  identity?: { id: string; traits?: Record<string, unknown> };
}) {
  if (!session.identity) return "Unknown";
  const traits = session.identity.traits as Record<string, string> | undefined;
  if (!traits) return session.identity.id;
  return traits.email || (traits.name as string) || session.identity.id;
}

function formatMethod(method: string) {
  const map: Record<string, string> = {
    password: "Password",
    totp: "TOTP",
    webauthn: "Passkey",
    link: "Magic Link",
    lookup_secret: "Recovery Code",
    oidc: "OIDC",
  };
  return map[method] || method;
}

export function SessionDetail({ sessionId }: SessionDetailProps) {
  const t = useTranslations();
  const router = useRouter();
  const { data: session, isLoading, error, refetch } = useSession(sessionId);
  const disableMutation = useDisableSession();
  const extendMutation = useExtendSession();

  if (isLoading) {
    return <DetailSkeleton sections={4} />;
  }

  if (error || !session) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("sessions.detail.failedToLoad")}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={() => refetch()}>
          {t("sessions.detail.retry")}
        </Button>
      </div>
    );
  }

  const timeRemaining = getTimeRemaining(session.expires_at);
  const isExpired = timeRemaining === "expired";
  const isExpiringSoon =
    timeRemaining !== null &&
    typeof timeRemaining === "object" &&
    timeRemaining.key === "remainingMinutes";

  const handleRevoke = async () => {
    try {
      await disableMutation.mutateAsync(sessionId);
      toast.success(t("toasts.success.sessionRevoked"));
      router.push("/sessions");
    } catch {
      toast.error(t("toasts.error.sessionRevokeFailed"));
    }
  };

  const handleExtend = async () => {
    try {
      await extendMutation.mutateAsync(sessionId);
      toast.success(t("toasts.success.sessionExtended"));
    } catch {
      toast.error(t("toasts.error.sessionExtendFailed"));
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/sessions")}>
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{t("sessions.detail.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {getIdentityDisplay(session)} —{" "}
            {session.authenticator_assurance_level?.toUpperCase() || "AAL1"}
          </p>
        </div>
        <Badge variant={session.active ? "default" : "secondary"}>
          {session.active ? t("sessions.detail.active") : t("sessions.detail.inactive")}
        </Badge>
      </div>

      <div className="space-y-6">
        <Section title={t("sessions.detail.title")} icon={<Info className="size-5 text-primary" />}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("sessions.detail.sessionId")}
              </p>
              <p className="text-sm font-mono break-all">{session.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("sessions.detail.status")}
              </p>
              <Badge variant={session.active ? "default" : "secondary"}>
                {session.active ? t("sessions.detail.active") : t("sessions.detail.inactive")}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("sessions.detail.aal")}
              </p>
              <p className="text-sm font-mono">
                {session.authenticator_assurance_level?.toUpperCase() || "AAL1"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("sessions.detail.authenticatedAt")}
              </p>
              <p className="text-sm">{formatDateTime(session.authenticated_at)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("sessions.detail.issuedAt")}
              </p>
              <p className="text-sm">{formatDateTime(session.issued_at)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("sessions.detail.expiresAt")}
              </p>
              <p
                className={`text-sm ${
                  isExpired ? "text-destructive" : isExpiringSoon ? "text-warning" : ""
                }`}
              >
                {formatDateTime(session.expires_at)}
              </p>
              {timeRemaining && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  {isExpiringSoon ? (
                    <AlertTriangle className="size-3 text-warning" />
                  ) : (
                    <Clock className="size-3" />
                  )}
                  {typeof timeRemaining === "string"
                    ? t("sessions.detail.expired")
                    : t(
                        `sessions.detail.${timeRemaining.key}`,
                        timeRemaining.values as unknown as Record<string, string | number | Date>,
                      )}
                </p>
              )}
            </div>
          </div>

          {session.authentication_methods && session.authentication_methods.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {t("sessions.detail.authenticationMethods")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {session.authentication_methods.map((m, i) => (
                    <Badge key={i} variant="outline">
                      {formatMethod(m.method)}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </Section>

        {session.identity && (
          <Section
            title={t("sessions.detail.title")}
            icon={<User className="size-5 text-primary" />}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("sessions.detail.identityId")}
                </p>
                <p className="text-sm font-mono break-all">{session.identity.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("sessions.detail.displayName")}
                </p>
                <p className="text-sm">{getIdentityDisplay(session)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("sessions.detail.state")}
                </p>
                <Badge variant={session.identity.state === "active" ? "default" : "secondary"}>
                  {session.identity.state || "inactive"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {t("sessions.detail.schemaId")}
                </p>
                <p className="text-sm">{session.identity.schema_id || "default"}</p>
              </div>
            </div>

            {session.identity.traits && Object.keys(session.identity.traits).length > 0 && (
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="traits">
                  <AccordionTrigger className="text-sm font-medium">
                    {t("sessions.detail.identityTraits")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                      {JSON.stringify(session.identity.traits, null, 2)}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </Section>
        )}

        {session.authentication_methods && session.authentication_methods.length > 0 && (
          <Section
            title={t("sessions.detail.authenticationMethods")}
            icon={<Shield className="size-5 text-primary" />}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="methods">
                <AccordionTrigger className="text-sm font-medium">
                  {t("sessions.detail.methodsUsed", { n: session.authentication_methods.length })}
                </AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(session.authentication_methods, null, 2)}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>
        )}

        {session.devices && session.devices.length > 0 && (
          <Section
            title={t("sessions.detail.title")}
            icon={<Smartphone className="size-5 text-primary" />}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="devices">
                <AccordionTrigger className="text-sm font-medium">
                  {t("sessions.detail.devicesRegistered", { n: session.devices.length })}
                </AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(session.devices, null, 2)}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="size-5 text-destructive" />
              {t("sessions.detail.actions")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="destructive"
                onClick={handleRevoke}
                disabled={disableMutation.isPending}
              >
                <Trash2 className="size-4 mr-1" />
                {disableMutation.isPending
                  ? t("sessions.detail.revoking")
                  : t("sessions.detail.revoke")}
              </Button>
              {session.active && !isExpired && (
                <Button
                  variant="outline"
                  onClick={handleExtend}
                  disabled={extendMutation.isPending}
                >
                  {extendMutation.isPending
                    ? t("sessions.detail.extending")
                    : t("sessions.detail.extend")}
                </Button>
              )}
              <Button variant="ghost" onClick={() => router.push("/sessions")}>
                {t("sessions.detail.backToSessions")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
