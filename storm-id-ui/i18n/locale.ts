import { cookies } from "next/headers";

export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  return defaultLocale;
}
