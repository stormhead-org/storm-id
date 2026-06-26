import { Noto_Sans, Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/src/shared/components/theme-provider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { Toaster } from "@/src/shared/components/ui/sonner";
import { cn } from "@/src/shared/lib/utils";

const nunitoSansHeading = Nunito_Sans({ subsets: ["latin"], variable: "--font-heading" });

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "STORM ID",
  description:
    "Единая учётная запись для всех продуктов STORMHEAD. Identity provider на базе OAuth2 и OpenID Connect.",
  keywords: [
    "STORM ID",
    "STORMHEAD",
    "OAuth2",
    "OpenID Connect",
    "identity",
    "SSO",
    "2FA",
    "авторизация",
  ],
  authors: [{ name: "STORMHEAD" }],
  creator: "STORMHEAD",
  publisher: "STORMHEAD",
  robots: { index: true, follow: true },
  openGraph: {
    title: "STORM ID — Identity Provider for STORMHEAD",
    description:
      "Единая учётная запись для всех продуктов STORMHEAD. Построено на Ory — той же инфраструктуре, что использует OpenAI.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary",
    title: "STORM ID — Identity Provider for STORMHEAD",
    description: "Единая учётная запись для всех продуктов STORMHEAD. OAuth2 + OpenID Connect.",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", notoSans.variable, nunitoSansHeading.variable)}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
