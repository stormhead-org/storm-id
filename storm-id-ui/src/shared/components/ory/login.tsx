"use client";

import type { OryCardFooterProps, OryFlowComponentOverrides } from "@ory/elements-react";
import { useTranslations } from "@/src/shared/lib/i18n";
import { CardFooter } from "@/src/shared/components/ui/card";
import { baseOverrides } from "./base";

function LoginFooter(_props: OryCardFooterProps) {
  const t = useTranslations();

  return (
    <CardFooter className="flex-col gap-2 text-center text-sm">
      <div>
        <a
          href="/recovery"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {t("auth.login.forgotPassword")}
        </a>
      </div>
      <div className="text-muted-foreground">
        {t("auth.login.noAccount")}{" "}
        <a
          href="/registration"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {t("auth.login.signUp")}
        </a>
      </div>
    </CardFooter>
  );
}

export const loginOverrides: OryFlowComponentOverrides = {
  ...baseOverrides,
  Card: {
    ...baseOverrides.Card,
    Footer: LoginFooter,
  },
};
