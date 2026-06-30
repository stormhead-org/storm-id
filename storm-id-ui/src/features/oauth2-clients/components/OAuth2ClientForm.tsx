"use client";

import { useState } from "react";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Button } from "@/src/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Switch } from "@/src/shared/components/ui/switch";
import { Badge } from "@/src/shared/components/ui/badge";
import { useTranslations } from "@/src/shared/lib/i18n";
import { X, Plus, Loader2, CheckCircle, Copy, Shield, Globe, Settings2 } from "lucide-react";
import { useCopyToClipboard } from "@/src/shared/hooks/useCopyToClipboard";
import type { OAuth2Client } from "../hooks/useOAuth2Clients";

interface FormState {
  client_name: string;
  redirect_uris: string[];
  grant_types: string[];
  response_types: string[];
  scope: string;
  is_public: boolean;
  is_stormic: boolean;
}

interface OAuth2ClientFormProps {
  initialData?: OAuth2Client;
  onSubmit: (data: FormState) => Promise<void>;
  isSubmitting: boolean;
  createdClient?: OAuth2Client | null;
}

const GRANT_TYPE_OPTIONS = [
  "authorization_code",
  "client_credentials",
  "refresh_token",
  "implicit",
  "urn:ietf:params:oauth:grant-type:device_code",
];

const RESPONSE_TYPE_OPTIONS = [
  "code",
  "token",
  "id_token",
  "code id_token",
  "token id_token",
  "code token id_token",
];

export function OAuth2ClientForm({
  initialData,
  onSubmit,
  isSubmitting,
  createdClient,
}: OAuth2ClientFormProps) {
  const t = useTranslations();
  const { copy, copiedField } = useCopyToClipboard();
  const [name, setName] = useState(initialData?.client_name || "");
  const [redirectUris, setRedirectUris] = useState<string[]>(initialData?.redirect_uris || []);
  const [newUri, setNewUri] = useState("");
  const [grantTypes, setGrantTypes] = useState<string[]>(
    initialData?.grant_types || ["authorization_code"],
  );
  const [responseTypes, setResponseTypes] = useState<string[]>(["code"]);
  const [scope, setScope] = useState(initialData?.scope || "openid profile email");
  const [isPublic, setIsPublic] = useState(initialData?.token_endpoint_auth_method === "none");
  const [isStormic, setIsStormic] = useState(
    !!initialData?.metadata &&
      (initialData.metadata as Record<string, unknown>).is_stormic === true,
  );
  const [redirectUriError, setRedirectUriError] = useState(false);

  if (createdClient) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="size-5" />
              {t("clients.form.success")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{t("clients.form.clientId")}</Label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
                  {createdClient.client_id}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copy(createdClient.client_id, "client_id")}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
              {copiedField === "client_id" && (
                <p className="text-xs text-green-600 mt-1">{t("clients.form.copied")}</p>
              )}
            </div>

            {createdClient.client_secret && (
              <div>
                <Label>{t("clients.form.clientSecret")}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
                    {createdClient.client_secret}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copy(createdClient.client_secret!, "client_secret")}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
                {copiedField === "client_secret" && (
                  <p className="text-xs text-green-600 mt-1">{t("clients.form.copied")}</p>
                )}
                <p className="text-xs text-destructive mt-1">{t("clients.form.secretWarning")}</p>
              </div>
            )}

            <div>
              <Label>{t("clients.form.type")}</Label>
              <p className="text-sm mt-1">
                <Badge variant={isPublic ? "secondary" : "default"}>
                  {isPublic ? t("clients.form.typePublic") : t("clients.form.typeConfidential")}
                </Badge>
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={() => (window.location.href = `/apps/${createdClient.client_id}`)}>
                {t("clients.form.viewApp")}
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/apps")}>
                {t("clients.form.backToApps")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (redirectUris.length === 0) {
      setRedirectUriError(true);
      return;
    }
    setRedirectUriError(false);
    await onSubmit({
      client_name: name,
      redirect_uris: redirectUris,
      grant_types: grantTypes,
      response_types: responseTypes,
      scope,
      is_public: isPublic,
      is_stormic: isStormic,
    });
  };

  const toggleGrantType = (gt: string) => {
    setGrantTypes((prev) => (prev.includes(gt) ? prev.filter((g) => g !== gt) : [...prev, gt]));
  };

  const toggleResponseType = (rt: string) => {
    setResponseTypes((prev) => (prev.includes(rt) ? prev.filter((r) => r !== rt) : [...prev, rt]));
  };

  const addRedirectUri = () => {
    if (newUri && !redirectUris.includes(newUri)) {
      setRedirectUris([...redirectUris, newUri]);
      setNewUri("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                {t("clients.form.basicInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">{t("clients.form.appName")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("clients.form.appNamePlaceholder")}
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch id="is_public" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="is_public">{t("clients.form.publicHint")}</Label>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Switch id="is_stormic" checked={isStormic} onCheckedChange={setIsStormic} />
                <Label htmlFor="is_stormic">{t("clients.form.isStormic")}</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="size-5 text-primary" />
                {t("clients.form.redirectUris")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newUri}
                  onChange={(e) => setNewUri(e.target.value)}
                  placeholder={t("clients.form.redirectUriPlaceholder")}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRedirectUri())}
                />
                <Button type="button" variant="outline" onClick={addRedirectUri}>
                  <Plus className="size-4" />
                </Button>
              </div>
              {redirectUris.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {redirectUris.map((uri) => (
                    <Badge key={uri} variant="secondary" className="gap-1">
                      {uri}
                      <button
                        type="button"
                        onClick={() => setRedirectUris(redirectUris.filter((u) => u !== uri))}
                        className="hover:text-destructive"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {redirectUriError && (
                <p className="text-sm text-destructive">At least one Redirect URI is required.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="size-5 text-primary" />
                {t("clients.form.oauth2Config")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>{t("clients.form.grantTypes")}</Label>
                <div className="flex flex-wrap gap-2">
                  {GRANT_TYPE_OPTIONS.map((gt) => (
                    <Badge
                      key={gt}
                      variant={grantTypes.includes(gt) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleGrantType(gt)}
                    >
                      {gt}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("clients.form.responseTypes")}</Label>
                <div className="flex flex-wrap gap-2">
                  {RESPONSE_TYPE_OPTIONS.map((rt) => (
                    <Badge
                      key={rt}
                      variant={responseTypes.includes(rt) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleResponseType(rt)}
                    >
                      {rt}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope">{t("clients.form.scopes")}</Label>
                <Input
                  id="scope"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  placeholder={t("clients.form.scopesPlaceholder")}
                />
                <p className="text-xs text-muted-foreground">{t("clients.form.scopesHint")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          {t("clients.form.cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting || redirectUris.length === 0}>
          {isSubmitting && <Loader2 className="size-4 mr-1 animate-spin" />}
          {initialData ? t("clients.form.saveChanges") : t("clients.form.createApp")}
        </Button>
      </div>
    </form>
  );
}
