"use client";

import type {
  OryCardSettingsSectionProps,
  OryFormSectionContentProps,
  OryFormSectionFooterProps,
  OryFlowComponentOverrides,
  OrySettingsPasskeyProps,
  OrySettingsRecoveryCodesProps,
  OrySettingsSsoProps,
  OrySettingsTotpProps,
  OrySettingsWebauthnProps,
} from "@ory/elements-react";
import { Node, useComponents } from "@ory/elements-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { Separator } from "@/src/shared/components/ui/separator";
import { useTranslations } from "@/src/shared/lib/i18n";
import { baseOverrides } from "./base";

function SettingsSection({ children, action, method, onSubmit }: OryCardSettingsSectionProps) {
  return (
    <Card className="mb-6 w-full">
      <form action={action} method={method} onSubmit={onSubmit}>
        {children}
      </form>
    </Card>
  );
}

function SettingsSectionContent({ title, description, children }: OryFormSectionContentProps) {
  return (
    <>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="flex flex-col gap-4 p-(--card-spacing)">{children}</CardContent>
    </>
  );
}

function SettingsSectionFooter({ children, text }: OryFormSectionFooterProps) {
  return (
    <CardFooter className="justify-between">
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
      <div className="ml-auto flex items-center gap-2">{children}</div>
    </CardFooter>
  );
}

function TotpSettingsSection({
  totpImage,
  totpSecret,
  totpInput,
  totpUnlink,
  onUnlink,
  isSubmitting,
}: OrySettingsTotpProps) {
  const t = useTranslations();
  if (totpUnlink) {
    return (
      <div className="space-y-4">
        <Separator />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">{t("settings.totp.enabledLabel")}</p>
            <p className="text-sm text-muted-foreground">{t("settings.totp.enabledDesc")}</p>
          </div>
          <Button
            variant="destructive"
            size="lg"
            onClick={onUnlink}
            disabled={isSubmitting}
            type="submit"
            className="min-h-10"
          >
            {isSubmitting ? "..." : t("settings.totp.remove2fa")}
          </Button>
        </div>
      </div>
    );
  }

  if (totpImage && totpSecret && totpInput) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex justify-center rounded-lg bg-muted p-6">
          <div className="aspect-square h-44 bg-background">
            <Node node={totpImage} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Node node={totpSecret} />
          <Node node={totpInput} />
        </div>
      </div>
    );
  }

  return null;
}

function RecoveryCodesSection({
  codes,
  revealButton,
  regenerateButton,
  onReveal: _onReveal,
  onRegenerate: _onRegenerate,
  isSubmitting: _isSubmitting,
}: OrySettingsRecoveryCodesProps) {
  if (codes.length > 0) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="grid grid-cols-2 gap-2">
            {codes.map((code, i) => (
              <code key={i} className="font-mono text-sm">
                {code}
              </code>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {revealButton && <Node node={revealButton} />}
          {regenerateButton && <Node node={regenerateButton} />}
        </div>
      </div>
    );
  }

  if (revealButton || regenerateButton) {
    return (
      <div className="flex gap-2">
        {revealButton && <Node node={revealButton} />}
        {regenerateButton && <Node node={regenerateButton} />}
      </div>
    );
  }

  return null;
}

function SsoSettingsSection({ linkButtons, unlinkButtons, isSubmitting }: OrySettingsSsoProps) {
  const t = useTranslations();
  const {
    Node: { SsoButton: OrySsoButton },
  } = useComponents();

  return (
    <div className="flex flex-col gap-4">
      {linkButtons.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {linkButtons.map((button) => (
            <OrySsoButton
              key={button.attributes.value}
              node={button}
              buttonProps={button.buttonProps}
              attributes={button.attributes}
              isSubmitting={isSubmitting}
              provider={String(button.attributes.value).split("-")[0]}
            />
          ))}
        </div>
      )}
      {unlinkButtons.length > 0 && (
        <>
          {linkButtons.length > 0 && <Separator />}
          <div className="flex flex-col gap-2">
            {unlinkButtons.map((button) => (
              <div
                key={button.attributes.value}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span className="text-sm font-medium">
                  {button.meta?.label?.text ?? String(button.attributes.value).split("-")[0]}
                </span>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={button.onClick}
                  disabled={isSubmitting}
                  type="submit"
                  className="min-h-10"
                >
                  {t("settings.oidc.unlink")}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function WebauthnSettingsSection({
  nameInput,
  triggerButton,
  removeButtons,
  isSubmitting,
}: OrySettingsWebauthnProps) {
  const t = useTranslations();
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <Node node={nameInput} />
      </div>
      <div className="flex gap-2">
        <Node node={triggerButton} />
      </div>
      {removeButtons.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            {removeButtons.map((button) => (
              <div
                key={button.attributes.value}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span className="text-sm">{button.meta?.label?.text ?? "Passkey"}</span>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={button.onClick}
                  disabled={isSubmitting}
                  type="submit"
                  className="min-h-10"
                >
                  {t("settings.webauthn.remove")}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PasskeySettingsSection({
  triggerButton,
  removeButtons,
  isSubmitting,
}: OrySettingsPasskeyProps) {
  const t = useTranslations();
  return (
    <div className="space-y-4">
      <Node node={triggerButton} />
      {removeButtons.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            {removeButtons.map((button) => (
              <div
                key={button.attributes.value}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span className="text-sm">{button.meta?.label?.text ?? "Passkey"}</span>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={button.onClick}
                  disabled={isSubmitting}
                  type="submit"
                  className="min-h-10"
                >
                  {t("settings.passkey.remove")}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const settingsOverrides: OryFlowComponentOverrides = {
  ...baseOverrides,
  Card: {
    ...baseOverrides.Card,
    SettingsSection,
    SettingsSectionContent,
    SettingsSectionFooter,
  },
  Form: {
    ...baseOverrides.Form,
    SsoSettings: SsoSettingsSection,
    TotpSettings: TotpSettingsSection,
    WebauthnSettings: WebauthnSettingsSection,
    PasskeySettings: PasskeySettingsSection,
    RecoveryCodesSettings: RecoveryCodesSection,
  },
};
