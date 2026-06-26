"use client";

import { useRouter } from "next/navigation";
import { useMessage } from "@/src/features/messages/hooks/useMessages";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import { Loader2, AlertCircle, ArrowLeft, Mail, Smartphone } from "lucide-react";

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  sent: "default",
  queued: "secondary",
  failed: "destructive",
  processing: "outline",
  abandoned: "secondary",
};

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

export function MessageDetail({ messageId }: { messageId: string }) {
  const t = useTranslations();
  const router = useRouter();
  const { data: message, isLoading, error } = useMessage(messageId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <AlertCircle className="size-8 mb-2" />
        <p>{t("messages.detail.failedToLoad")}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => router.push("/messages")}
        >
          {t("messages.detail.backToMessages")}
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/messages")}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{t("messages.detail.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {message.subject || t("messages.detail.noSubject")}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <DetailSection title={t("messages.detail.generalInfo")}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.messageId")}
              </p>
              <p className="text-sm font-mono break-all">{message.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.status")}
              </p>
              <Badge variant={STATUS_VARIANTS[message.status] || "secondary"}>
                {message.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.type")}
              </p>
              <div className="flex items-center gap-1">
                {message.type === "sms" ? (
                  <Smartphone className="size-4 text-primary" />
                ) : (
                  <Mail className="size-4 text-primary" />
                )}
                <span className="text-sm capitalize">{message.type || "email"}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.channel")}
              </p>
              <p className="text-sm">{message.channel || t("messages.detail.defaultChannel")}</p>
            </div>
          </div>
        </DetailSection>

        <DetailSection title={t("messages.detail.timing")}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.createdAt")}
              </p>
              <p className="text-sm">{new Date(message.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.updatedAt")}
              </p>
              <p className="text-sm">
                {message.updated_at ? new Date(message.updated_at).toLocaleString() : "—"}
              </p>
            </div>
          </div>
        </DetailSection>

        <DetailSection title={t("messages.detail.template")}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.templateType")}
              </p>
              <p className="text-sm font-mono">{message.template_type || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {t("messages.detail.sendCount")}
              </p>
              <p className="text-sm">{message.send_count ?? 0}</p>
            </div>
          </div>
        </DetailSection>

        <DetailSection title={t("messages.detail.recipient")}>
          <p className="text-sm">{message.recipient}</p>
        </DetailSection>

        <DetailSection title={t("messages.detail.subject")}>
          <p className="text-sm">{message.subject || t("messages.detail.noSubject")}</p>
        </DetailSection>

        {message.body && (
          <DetailSection title={t("messages.detail.content")}>
            <div className="bg-background p-4 rounded-lg max-h-96 overflow-y-auto text-sm whitespace-pre-wrap border">
              {message.body}
            </div>
          </DetailSection>
        )}

        {message.dispatches && message.dispatches.length > 0 && (
          <div className="rounded-lg border bg-muted/50 px-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="dispatches" className="border-none">
                <AccordionTrigger className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3">
                  {t("messages.detail.deliveryAttempts", { n: message.dispatches.length })}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-3">
                    {message.dispatches.map((dispatch) => (
                      <div
                        key={dispatch.id}
                        className="border bg-background rounded-lg p-4 space-y-3"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">
                              {t("messages.detail.dispatchId")}
                            </p>
                            <p className="font-mono text-sm">{dispatch.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">
                              {t("messages.detail.status")}
                            </p>
                            <Badge
                              variant={dispatch.status === "failed" ? "destructive" : "secondary"}
                            >
                              {dispatch.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">
                              {t("messages.detail.created")}
                            </p>
                            <p className="text-sm">
                              {new Date(dispatch.created_at).toLocaleString()}
                            </p>
                          </div>
                          {dispatch.updated_at && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-0.5">
                                {t("messages.detail.updated")}
                              </p>
                              <p className="text-sm">
                                {new Date(dispatch.updated_at).toLocaleString()}
                              </p>
                            </div>
                          )}
                        </div>
                        {dispatch.error && (
                          <div className="bg-destructive/10 p-3 rounded text-sm text-destructive font-mono whitespace-pre-wrap">
                            {typeof dispatch.error === "string"
                              ? dispatch.error
                              : JSON.stringify(dispatch.error, null, 2)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
