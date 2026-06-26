"use client";

import { cn } from "@/src/shared/lib/utils";
import { useSession } from "@/src/shared/hooks/useSession";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useRef, useState, useCallback } from "react";
import { Menu, Sun, Moon, User, LogOut, Shield, Globe } from "lucide-react";
import { useTranslations, useLocale } from "@/src/shared/lib/i18n";
import { Button } from "@/src/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/src/shared/components/ui/sheet";
import { Container } from "@/src/shared/components/Container";
import { AdminSidebar } from "./AdminSidebar";

interface AdminHeaderProps {
  className?: string;
}

export function AdminHeader({ className }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();
  const { session, loading } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const t = useTranslations();

  const switchLocale = useCallback(() => {
    const next = locale === "en" ? "ru" : "en";
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    window.location.reload();
  }, [locale]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      const res = await fetch("/api/kratos/logout", { method: "POST" });
      if (res.ok) {
        const { logoutUrl } = await res.json();
        window.location.href = logoutUrl;
      } else {
        window.location.href = "/login";
      }
    } catch {
      window.location.href = "/login";
    }
  };

  const avatarLetter = session?.name?.charAt(0) || session?.email?.charAt(0) || "?";

  if (loading) {
    return (
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className,
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
              <div className="h-5 w-28 rounded bg-muted animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-full bg-muted animate-pulse" />
            </div>
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left: mobile hamburger + logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-4">
                <div className="flex items-center gap-2 mb-6 mt-2">
                  <Shield className="size-6 text-primary" />
                  <span className="text-lg font-bold">STORM ID</span>
                </div>
                <AdminSidebar
                  onNavClick={() => {
                    const closeBtn = document.querySelector("[data-sheet-close]");
                    if (closeBtn instanceof HTMLElement) closeBtn.click();
                  }}
                />
              </SheetContent>
            </Sheet>
            <a
              href="/"
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Shield className="size-6 text-primary hidden sm:block" />
              <span className="text-lg font-bold hidden sm:block">STORM ID</span>
            </a>
          </div>

          {/* Center: (reserved for nav buttons) */}
          <div className="hidden lg:block" />

          {/* Right: theme toggle + user avatar dropdown */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={switchLocale}
              aria-label="Switch language"
              className="text-muted-foreground"
            >
              <Globe className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-muted-foreground"
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>

            <div className="relative" ref={menuRef}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="User menu"
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {avatarLetter}
                  </AvatarFallback>
                </Avatar>
              </Button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border bg-popover p-1.5 shadow-lg">
                    <div className="px-3 py-2 border-b mb-1">
                      <p className="text-sm font-medium truncate">
                        {session?.name || session?.email || t("header.user")}
                      </p>
                      {session?.email && session?.name && (
                        <p className="text-xs text-muted-foreground truncate">{session.email}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-accent transition-colors"
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/profile");
                      }}
                    >
                      <User className="size-4 text-muted-foreground" />
                      {t("sidebar.profile")}
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-accent transition-colors text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" />
                      {t("header.logout")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
