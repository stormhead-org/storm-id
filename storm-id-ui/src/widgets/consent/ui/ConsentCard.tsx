"use client";

import { Avatar, AvatarFallback } from "@/src/shared/components/ui/avatar";
import { Badge } from "@/src/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Separator } from "@/src/shared/components/ui/separator";
import { useTranslations } from "@/src/shared/lib/i18n";
import type { ConsentRequestData } from "@/src/features/oauth2-consent/hooks/useConsentRequest";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface ConsentCardProps {
  data: ConsentRequestData;
}

export function ConsentCard({ data }: ConsentCardProps) {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{getInitials(data.clientName)}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-xl">{t("consent.appName")}</CardTitle>
          <CardDescription>{t("consent.requesting", { name: data.clientName })}</CardDescription>
        </CardHeader>

        <form method="POST" action="/api/hydra/auth/consent">
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("consent.permissions")}
              </p>
              <ul className="space-y-2">
                {data.requestedScope.map((scope) => {
                  const scopeKey = scope === "offline_access" ? "offlineAccess" : scope;
                  const label = t(`consent.scopes.${scopeKey}`, { fallback: scope });
                  return (
                    <li key={scope} className="flex items-center gap-2 text-sm">
                      <span className="text-green-500">&#10003;</span>
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>

            {data.requestedAudience.length > 0 && (
              <>
                <Separator />
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("consent.audience")}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {data.requestedAudience.map((aud) => (
                      <Badge key={aud} variant="secondary">
                        {aud}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>

          <CardFooter className="flex gap-3 pt-4">
            <button
              type="submit"
              name="action"
              value="deny"
              className="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              {t("consent.deny")}
            </button>
            <button
              type="submit"
              name="action"
              value="accept"
              className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              {t("consent.accept")}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
