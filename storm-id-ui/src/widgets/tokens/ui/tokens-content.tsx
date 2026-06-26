"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useTokenIntrospectionManager,
  useTokenStats,
} from "@/src/features/oauth2-tokens/hooks/useOAuth2Tokens";
import { useTokenStore } from "@/src/features/oauth2-tokens/store/token-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { Card, CardContent } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Loader2, Search, Trash2, KeyRound, Shield, Clock, AlertCircle, List } from "lucide-react";

function formatTimestamp(ts?: number): string {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleString();
}

export function TokensContent() {
  const t = useTranslations();
  const router = useRouter();
  const tokens = useTokenStore((s) => s.tokens);
  const removeToken = useTokenStore((s) => s.removeToken);
  const clearAll = useTokenStore((s) => s.clearAll);
  const { introspect, isIntrospecting, introspectError, revoke, isRevoking } =
    useTokenIntrospectionManager();
  const stats = useTokenStats();
  const [activeTab, setActiveTab] = useState("introspect");
  const [tokenInput, setTokenInput] = useState("");
  const [scopeInput, setScopeInput] = useState("");
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [tokenToRevoke, setTokenToRevoke] = useState<string | null>(null);

  const handleIntrospect = async () => {
    if (!tokenInput.trim()) return;
    try {
      const data = await introspect(tokenInput.trim(), scopeInput.trim() || undefined);
      if (data.active) {
        setActiveTab("list");
      } else {
        toast.error(t("toasts.error.tokenInactive"));
      }
      setTokenInput("");
    } catch {
      toast.error(t("toasts.error.tokenIntrospectFailed"));
      setTokenInput("");
    }
  };

  const handleRevoke = async () => {
    if (!tokenToRevoke) return;
    try {
      await revoke(tokenToRevoke);
      toast.success(t("toasts.success.tokenRevoked"));
      const revoked = tokens.find((t) => t.original_token === tokenToRevoke);
      if (revoked) removeToken(revoked.id);
      setRevokeDialogOpen(false);
      setTokenToRevoke(null);
    } catch {
      toast.error(t("toasts.error.tokenRevokeFailed"));
    }
  };

  const expiringSoon = tokens.filter(
    (t) => t.active && t.exp && t.exp * 1000 > Date.now() && t.exp * 1000 - Date.now() <= 86400000,
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <KeyRound className="size-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">{t("tokens.introspect.total")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Shield className="size-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-xs text-muted-foreground">{t("tokens.introspect.active")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="size-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{stats.expired}</p>
              <p className="text-xs text-muted-foreground">
                {t("tokens.introspect.expiredInactive")}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="size-5 text-amber-500" />
            <div>
              <p className="text-2xl font-bold">{expiringSoon}</p>
              <p className="text-xs text-muted-foreground">{t("tokens.introspect.expiring24h")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="introspect" className="flex items-center gap-2">
              <Search className="size-4" />
              {t("tokens.introspect.title")}
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="size-4" />
              {t("tokens.introspect.tokenList")}{" "}
              {tokens.length > 0 && <Badge variant="secondary">{tokens.length}</Badge>}
            </TabsTrigger>
          </TabsList>
          {tokens.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAll}>
              {t("tokens.introspect.clearAll")}
            </Button>
          )}
        </div>

        <TabsContent value="introspect" className="mt-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("tokens.introspect.accessToken")}
                </label>
                <Input
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
                  onKeyDown={(e) => e.key === "Enter" && handleIntrospect()}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("tokens.introspect.scope")}
                </label>
                <Input
                  value={scopeInput}
                  onChange={(e) => setScopeInput(e.target.value)}
                  placeholder={t("tokens.introspect.scopePlaceholder")}
                  onKeyDown={(e) => e.key === "Enter" && handleIntrospect()}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleIntrospect} disabled={isIntrospecting || !tokenInput.trim()}>
                  {isIntrospecting && <Loader2 className="size-4 mr-1 animate-spin" />}
                  {t("tokens.introspect.introspect")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTokenInput("");
                    setScopeInput("");
                  }}
                >
                  {t("tokens.introspect.clear")}
                </Button>
              </div>
              {introspectError && (
                <p className="text-sm text-destructive">
                  {(introspectError as Error).message || t("tokens.introspect.failed")}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          {tokens.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("tokens.table.columns.token")}</TableHead>
                  <TableHead>{t("tokens.table.columns.status")}</TableHead>
                  <TableHead>{t("tokens.table.columns.clientId")}</TableHead>
                  <TableHead>{t("tokens.table.columns.scopes")}</TableHead>
                  <TableHead>{t("tokens.table.columns.subject")}</TableHead>
                  <TableHead>{t("tokens.table.columns.expires")}</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token) => {
                  const now = Math.floor(Date.now() / 1000);
                  const isExpired = token.exp ? token.exp < now : false;
                  const scopes = token.scope ? token.scope.split(" ").filter(Boolean) : [];

                  return (
                    <TableRow
                      key={token.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/tokens/${token.id}`)}
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {token.original_token
                          ? `${token.original_token.substring(0, 12)}...${token.original_token.substring(token.original_token.length - 6)}`
                          : token.id.substring(0, 12)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={token.active && !isExpired ? "default" : "secondary"}>
                          {token.active && !isExpired
                            ? t("tokens.table.status.active")
                            : isExpired
                              ? t("tokens.table.status.expired")
                              : t("tokens.table.status.inactive")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {token.client_id?.substring(0, 16) || "—"}...
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {scopes.slice(0, 2).map((s) => (
                            <Badge key={s} variant="outline" className="text-xs">
                              {s}
                            </Badge>
                          ))}
                          {scopes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{scopes.length - 2}
                            </Badge>
                          )}
                          {scopes.length === 0 && (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {token.sub?.substring(0, 24) || "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {token.exp ? formatTimestamp(token.exp) : "—"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTokenToRevoke(token.original_token);
                            setRevokeDialogOpen(true);
                          }}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <KeyRound className="size-8 mb-2" />
              <p>{t("tokens.noTokens")}</p>
              <p className="text-xs mt-1">{t("tokens.noTokensHint")}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

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
