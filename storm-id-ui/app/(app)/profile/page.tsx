import { SessionProvider } from "@ory/elements-react/client";
import { getSettingsFlow, getServerSession, type OryPageParams } from "@ory/nextjs/app";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import config from "@/src/shared/config/ory.config";
import { getLocale } from "@/i18n/locale";
import { ProfileSettings } from "@/src/widgets/profile/ui/profile-settings";

export default async function ProfilePage(props: OryPageParams) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();

  if (!searchParams.flow) {
    const h = await headers();
    const host = h.get("host") || "localhost:4455";
    const protocol = h.get("x-forwarded-proto") || "http";
    const publicUrl = `${protocol}://${host}`;

    redirect(`${publicUrl}/self-service/settings/browser`);
  }

  const rawFlow = await getSettingsFlow(config, props.searchParams);
  const session = await getServerSession().catch(() => null);

  if (!rawFlow) {
    return null;
  }

  const flow = JSON.parse(JSON.stringify(rawFlow));
  for (const node of flow.ui.nodes) {
    if (node.attributes?.id === "webauthn_script") {
      node.attributes.src = "/api/self/webauthn.js";
      node.attributes.crossorigin = "";
    }
  }

  return (
    <SessionProvider session={session ?? undefined}>
      <ProfileSettings flow={flow} config={{ ...config, intl: { locale } }} />
    </SessionProvider>
  );
}
