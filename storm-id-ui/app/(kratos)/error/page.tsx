import { Error as ErrorComponent } from "@ory/elements-react/theme";
import type { FlowError } from "@ory/client-fetch";
import "@ory/elements-react/theme/styles.css";
import { getServerSession, type OryPageParams } from "@ory/nextjs/app";
import { Configuration, FrontendApi } from "@ory/client-fetch";
import config from "@/src/shared/config/ory.config";
import { baseOverrides } from "@/src/shared/components/ory/base";
import { getLocale } from "@/i18n/locale";

const kratosPublicUrl = process.env.KRATOS_PUBLIC_URL || "http://kratos:4433";
const frontend = new FrontendApi(new Configuration({ basePath: kratosPublicUrl }));

export default async function ErrorPage(props: OryPageParams) {
  const params = await props.searchParams;
  const locale = await getLocale();
  const errorId = typeof params.id === "string" ? params.id : undefined;

  let error: FlowError | null = null;
  if (errorId) {
    try {
      error = await frontend.getFlowError({ id: errorId });
    } catch {
      error = null;
    }
  }

  const session = await getServerSession().catch(() => null);

  if (!error) {
    return null;
  }

  return (
    <ErrorComponent
      error={error}
      config={{ ...config, intl: { locale } }}
      components={baseOverrides}
      session={session ?? undefined}
    />
  );
}
