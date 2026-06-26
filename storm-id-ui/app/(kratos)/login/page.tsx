import { Login } from "@ory/elements-react/theme";
import "@ory/elements-react/theme/styles.css";
import { getLoginFlow, type OryPageParams } from "@ory/nextjs/app";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import config from "@/src/shared/config/ory.config";
import { loginOverrides } from "@/src/shared/components/ory/login";
import { getLocale } from "@/i18n/locale";

export default async function LoginPage(props: OryPageParams) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();

  if (!searchParams.flow) {
    const h = await headers();
    const host = h.get("host") || "localhost:4455";
    const protocol = h.get("x-forwarded-proto") || "http";
    const publicUrl = `${protocol}://${host}`;

    const originParam = new URLSearchParams();
    const copyKeys = ["aal", "refresh", "login_challenge", "return_to"];
    for (const key of copyKeys) {
      const val = searchParams[key];
      if (val) originParam.set(key, Array.isArray(val) ? val[0] : val);
    }
    const qs = originParam.toString();

    redirect(`${publicUrl}/self-service/login/browser${qs ? "?" + qs : ""}`);
  }

  const flow = await getLoginFlow(config, props.searchParams);

  if (!flow) {
    return null;
  }

  return <Login flow={flow} config={{ ...config, intl: { locale } }} components={loginOverrides} />;
}
