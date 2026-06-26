"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTokenStore } from "@/src/features/oauth2-tokens/store/token-store";
import { useTokenIntrospectionManager } from "@/src/features/oauth2-tokens/hooks/useOAuth2Tokens";
import { useTranslations } from "@/src/shared/lib/i18n";
import { useCopyToClipboard } from "@/src/shared/hooks/useCopyToClipboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Shield, ArrowLeft, CheckCircle2, AlertCircle, Copy, Trash2 } from "lucide-react";

interface TokenDetailProps {
  tokenId: string;
}

function formatTimestamp(ts?: number): string {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleString();
}

function formatTimeToExpiry(seconds: number): string {
  if (seconds <= 0) return "expired";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${seconds}s`;
}

export function TokenDetail({ tokenId }: TokenDetailProps) {
  const t = useTranslations();
  const router = useRouter();
  const token = useTokenStore((s) => s.tokens.find((tk) => tk.id === tokenId));
  const removeToken = useTokenStore((s) => s.removeToken);
  const { revoke, isRevoking } = useTokenIntrospectionManager();
  const { copy, copiedField } = useCopyToClipboard();
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);

  if (!token) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        <p className="text-lg">{t("tokens.noTokens")}</p>
        <Button variant="link" onClick={() => router.push("/tokens")} className="mt-2">
          {t("tokens.detail.backToList")}
        </Button>
      </div>
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const isExpired = token.exp ? token.exp < now : false;
  const timeToExpiry = token.exp ? token.exp - now : undefined;
  const scopes = token.scope ? token.scope.split(" ").filter(Boolean) : [];
  const audience = Array.isArray(token.aud) ? token.aud : token.aud ? [token.aud] : [];

  const handleRevoke = async () => {
    try {
      await revoke(token.original_token);
      toast.success(t("toasts.success.tokenRevoked"));
      removeToken(token.id);
      router.push("/tokens");
    } catch {
      toast.error(t("toasts.error.tokenRevokeFailed"));
    }
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" onClick={() => router.push("/tokens")}>
          <ArrowLeft className="size-4" />
          {t("tokens.detail.backToList")}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="gap-2"
          onClick={() => setRevokeDialogOpen(true)}
        >
          <Trash2 className="size-4" />
          {t("tokens.revoke.revoke")}
        </Button>
      </div>

      <div
        className={`flex items-center gap-2 p-4 rounded-lg text-sm ${
          token.active && !isExpired
            ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300"
            : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"
        }`}
      >
        {token.active && !isExpired ? (
          <CheckCircle2 className="size-5 shrink-0" />
        ) : (
          <AlertCircle className="size-5 shrink-0" />
        )}
        <span className="font-medium">
          {t("tokens.detail.tokenStatus", {
            active: String(token.active),
            time:
              timeToExpiry && timeToExpiry > 0
                ? formatTimeToExpiry(timeToExpiry)
                : t("tokens.detail.expired"),
          })}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            {t("tokens.detail.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={["basic"]}>
            <AccordionItem value="basic">
              <AccordionTrigger>{t("tokens.detail.basicInfo")}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("tokens.detail.subject")}</p>
                    <p className="text-sm font-mono break-all">{token.sub || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("tokens.detail.clientId")}</p>
                    <p className="text-sm font-mono break-all">{token.client_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("tokens.detail.tokenType")}</p>
                    <p className="text-sm">{token.token_type || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("tokens.detail.issuer")}</p>
                    <p className="text-sm font-mono break-all">{token.iss || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("tokens.detail.username")}</p>
                    <p className="text-sm">{token.username || "N/A"}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="timestamps">
              <AccordionTrigger>{t("tokens.detail.timestamps")}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("tokens.detail.issuedAt")}</p>
                    <p className="text-sm">{formatTimestamp(token.iat)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("tokens.detail.expiresAt")}</p>
                    <p className="text-sm">{formatTimestamp(token.exp)}</p>
                  </div>
                  {token.nbf && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("tokens.detail.notBefore")}
                      </p>
                      <p className="text-sm">{formatTimestamp(token.nbf)}</p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="scopes">
              <AccordionTrigger>{t("tokens.detail.scopes")}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t("tokens.detail.scopes")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {scopes.length > 0 ? (
                        scopes.map((s) => (
                          <Badge key={s} variant="outline">
                            {s}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {t("tokens.detail.subject")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t("tokens.detail.audience")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {audience.length > 0 ? (
                        audience.map((a) => (
                          <Badge key={a} variant="secondary">
                            {a}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {t("tokens.detail.subject")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="raw">
              <AccordionTrigger>{t("tokens.detail.rawData")}</AccordionTrigger>
              <AccordionContent>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => copy(JSON.stringify(token, null, 2), "raw")}
                  >
                    {copiedField === "raw" ? (
                      <CheckCircle2 className="size-4 text-green-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto max-h-60">
                    {JSON.stringify(token, null, 2)}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Dialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("tokens.revoke.title")}</DialogTitle>
            <DialogDescription>{t("tokens.revoke.description")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevokeDialogOpen(false)}>
              {t("tokens.revoke.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleRevoke} disabled={isRevoking}>
              {isRevoking ? t("tokens.revoke.revoking") : t("tokens.revoke.revoke")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
