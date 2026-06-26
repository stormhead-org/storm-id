"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "@/src/shared/lib/i18n";
import { Button } from "@/src/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import {
  Shield,
  Fingerprint,
  ShieldCheck,
  Server,
  Lock,
  Smartphone,
  Code,
  Sparkles,
  Sun,
  Moon,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const locale = useLocale();

  const switchLocale = useCallback(() => {
    const next = locale === "en" ? "ru" : "en";
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    window.location.reload();
  }, [locale]);

  return (
    <div className="min-h-screen bg-background">
      {/* Controls bar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={switchLocale}
          aria-label="Switch language"
          className="size-9 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Globe className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="size-9 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-24 md:py-36">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Shield className="size-10 text-primary" />
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                {t("landing.hero.title")}
              </h1>
              <p className="max-w-2xl text-xl text-muted-foreground md:text-2xl">
                {t("landing.hero.subtitle")}
              </p>
            </div>
            <div className="mt-8">
              <Button
                asChild
                className="h-14 gap-2 rounded-xl px-12 text-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <a href="/login">{t("landing.hero.join")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{t("landing.features.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("landing.features.subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-transform hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Fingerprint className="size-5 text-primary" />
                </div>
                <CardTitle>{t("landing.features.sso.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {t("landing.features.sso.desc")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="transition-transform hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="size-5 text-primary" />
                </div>
                <CardTitle>{t("landing.features.security.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {t("landing.features.security.desc")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="ring-1 ring-primary/20 transition-transform hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <CardTitle>{t("landing.features.enterprise.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {t("landing.features.enterprise.desc")}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{t("landing.capabilities.title")}</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-transform hover:scale-[1.02]">
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Server className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t("landing.capabilities.oauth2.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {t("landing.capabilities.oauth2.desc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:scale-[1.02]">
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Lock className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t("landing.capabilities.twofa.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {t("landing.capabilities.twofa.desc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-transform hover:scale-[1.02]">
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Smartphone className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg">
                  {t("landing.capabilities.sessions.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {t("landing.capabilities.sessions.desc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Developers */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <Code className="size-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold md:text-3xl">{t("landing.developers.title")}</h2>
            <p className="max-w-lg text-muted-foreground">{t("landing.developers.desc")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["OAuth2", "OpenID Connect", "PKCE", "REST API"].map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-1.5 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="size-4 text-primary" />
            {t("landing.footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
}
