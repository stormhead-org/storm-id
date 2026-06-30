import { Recovery } from "@ory/elements-react/theme";
import "@ory/elements-react/theme/styles.css";
import { getRecoveryFlow, type OryPageParams } from "@ory/nextjs/app";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import config from "@/src/shared/config/ory.config";
import { recoveryOverrides } from "@/src/shared/components/ory/recovery";
import { getLocale } from "@/i18n/locale";

export default async function RecoveryPage(props: OryPageParams) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();

  if (!searchParams.flow) {
    const h = await headers();
    const host = h.get("host") || "localhost:4455";
    const protocol = h.get("x-forwarded-proto") || "http";
    const publicUrl = `${protocol}://${host}`;

    const originParam = new URLSearchParams();
    const copyKeys = ["return_to"];
    for (const key of copyKeys) {
      const val = searchParams[key];
      if (val) originParam.set(key, Array.isArray(val) ? val[0] : val);
    }
    const qs = originParam.toString();

    redirect(`${publicUrl}/self-service/recovery/browser${qs ? "?" + qs : ""}`);
  }

  const flow = await getRecoveryFlow(config, props.searchParams);

  if (!flow) {
    return null;
  }

  return (
    <Recovery flow={flow} config={{ ...config, intl: { locale } }} components={recoveryOverrides} />
  );
}
