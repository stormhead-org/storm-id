"use client";

import type { SettingsFlow } from "@ory/client-fetch";
import type { OryClientConfiguration } from "@ory/elements-react";
import { OrySettingsCard } from "@ory/elements-react";
import { Settings } from "@ory/elements-react/theme";
import "@ory/elements-react/theme/styles.css";
import { useTranslations } from "@/src/shared/lib/i18n";
import { settingsOverrides } from "@/src/shared/components/ory/settings";

interface ProfileSettingsProps {
  flow: SettingsFlow;
  config: OryClientConfiguration;
}

/**
 * Renders the Ory settings flow with the standard page layout used by
 * every other page in the project (page-header + content).
 *
 * Passing `children` to `<Settings>` makes it skip the `<div class="ory-elements">`
 * wrapper, whose CSS reset otherwise strips shadcn styling (rounded corners,
 * backgrounds, borders) from inputs and buttons. The flow content itself is
 * still produced by `OrySettingsCard` via the `useOryFlow()` context.
 */
export function ProfileSettings({ flow, config }: ProfileSettingsProps) {
  const t = useTranslations();

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("settings.subtitle")}</p>
      </div>
      <Settings flow={flow} config={config} components={settingsOverrides}>
        <OrySettingsCard />
      </Settings>
    </div>
  );
}
