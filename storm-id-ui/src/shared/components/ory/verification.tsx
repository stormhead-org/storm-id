"use client";

import type { OryCardFooterProps, OryFlowComponentOverrides } from "@ory/elements-react";
import { useTranslations } from "@/src/shared/lib/i18n";
import { CardFooter } from "@/src/shared/components/ui/card";
import { baseOverrides } from "./base";

function VerificationFooter(_props: OryCardFooterProps) {
  const t = useTranslations();

  return (
    <CardFooter className="flex-col gap-2 text-center text-sm">
      <div className="text-muted-foreground">
        {t("auth.verification.alreadyVerified")}{" "}
        <a
          href="/login"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {t("auth.registration.signIn")}
        </a>
      </div>
    </CardFooter>
  );
}

export const verificationOverrides: OryFlowComponentOverrides = {
  ...baseOverrides,
  Card: {
    ...baseOverrides.Card,
    Footer: VerificationFooter,
  },
};
