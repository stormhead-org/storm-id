import type { OryClientConfiguration } from "@ory/elements-react";

const oryConfig: OryClientConfiguration = {
  sdk: {
    url: process.env.NEXT_PUBLIC_ORY_SDK_URL || "",
    options: { credentials: "include" },
  },
  project: {
    name: "STORM ID",
    login_ui_url: "/login",
    registration_ui_url: "/registration",
    settings_ui_url: "/profile",
    recovery_ui_url: "/recovery",
    verification_ui_url: "/verification",
    error_ui_url: "/error",
    default_redirect_url: "/welcome",
    registration_enabled: true,
    verification_enabled: true,
    recovery_enabled: true,
  },
};

export default oryConfig;
