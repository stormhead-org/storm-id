"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateIdentity } from "@/src/features/identities/hooks/useIdentities";
import { useTranslations } from "@/src/shared/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";

export function CreateIdentityForm() {
  const t = useTranslations();
  const createMutation = useCreateIdentity();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createdId, setCreatedId] = useState<string | null>(null);

  if (createdId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="size-5" />
            {t("identities.create.success")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("identities.create.successDesc", { name: email || name })}
          </p>
          <div className="flex gap-2">
            <Button onClick={() => router.push(`/identities/${createdId}`)}>
              {t("identities.create.viewUser")}
            </Button>
            <Button variant="outline" onClick={() => router.push("/identities")}>
              {t("identities.create.backToUsers")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const traits: Record<string, string> = {};
    if (email) traits.email = email;
    if (name) traits.name = name;

    const data: Record<string, unknown> = {
      schema_id: "default",
      traits,
      state: "active",
    };

    if (password) {
      data.credentials = {
        password: {
          config: {
            password,
          },
        },
      };
    }

    try {
      const result = await createMutation.mutateAsync(data as any);
      setCreatedId(result.id);
    } catch {
      toast.error(t("toasts.error.identityCreateFailed"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>{t("identities.create.userInfo")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("identities.create.displayName")}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("identities.create.displayNamePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("identities.create.email")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("identities.create.emailPlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("identities.create.password")}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("identities.create.passwordPlaceholder")}
            />
            <p className="text-xs text-muted-foreground">{t("identities.create.passwordHint")}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={() => router.push("/identities")}>
          {t("identities.create.cancel")}
        </Button>
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending && <Loader2 className="size-4 mr-1 animate-spin" />}
          {t("identities.create.createUser")}
        </Button>
      </div>
    </form>
  );
}
