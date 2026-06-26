# STORM ID

**Собственный self‑hosted identity provider — OAuth2 / OIDC со встроенной RBAC.**

Одна команда `docker compose up`. Полный контроль над пользователями, ролями и приложениями. Никакой привязки к вендору.

<p align="center">
  <img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/Ory-Stack-5528FF" alt="Ory Stack">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js 16">
  <img src="https://img.shields.io/badge/Postgres-15-336791" alt="Postgres">
</p>

---

## Зачем STORM ID?

Любое современное приложение требует аутентификации, авторизации и управления учётными записями. Большинство команд либо переплачивают за SaaS‑провайдера, либо неделями собирают самописную инфраструктуру.

STORM ID даёт **полный стек Ory** (Hydra + Kratos + Keto) за отполированным Next.js UI — готов за пять минут.

- **OAuth2 / OIDC** — из коробки через Ory Hydra. Авторизация сторонних приложений, access & refresh токены, PKCE.
- **Self‑service flows** — регистрация, вход, восстановление пароля, подтверждение email через Ory Kratos. Без бэкенда.
- **Dynamic RBAC** — Discord‑стиль: роли с wildcard‑правами и иерархией позиций. Управление из дашборда, без конфигов.
- **2FA / TOTP** — QR‑коды, backup‑коды, AAL2‑логин. Включение и отключение из настроек.
- **Управление клиентами** — каждый пользователь может создавать свои OAuth2‑приложения без прав администратора.
- **Token inspector** — интроспекция, отладка и отзыв OAuth2‑токенов из дашборда.

---

## UI компоненты

Все UI‑компоненты — [shadcn/ui](https://ui.shadcn.com). ORY‑формы (логин, регистрация, настройки) рендерятся через кастомные overrides в `src/shared/components/ory/` — 6 файлов, которые заменяют `@ory/elements-react` на shadcn‑эквиваленты.

| Файл | Назначение |
|------|-----------|
| `base.tsx` | Базовые компоненты: Card, Form, Node (Input, Button, SSO, Checkbox, Select, Text), Message |
| `login.tsx` | Форма входа |
| `registration.tsx` | Форма регистрации |
| `recovery.tsx` | Восстановление пароля |
| `verification.tsx` | Подтверждение email |
| `settings.tsx` | Профиль: TOTP, WebAuthn, SSO, backup‑коды |

Submit‑кнопки переводятся через ORY `react-intl`; кастомные кнопки (Remove 2FA, Unlink) — через `next-intl`.

## i18n

Проект поддерживает два языка: **русский** (default) и **английский**. Локали лежат в `messages/{locale}.json`. Определение языка — через cookie `locale` (fallback `"ru"`).

Конфигурация: `i18n/request.ts` с `createNextIntlPlugin` в `next.config.ts`. Root layout оборачивает приложение в `<NextIntlClientProvider>`.

---

## Быстрый старт

```bash
cp .env.example .env
docker compose -f docker-compose.dev.yml up -d --build
bash scripts/register-client.sh 'My App' http://localhost:5173/callback --public
# Открыть http://localhost:4455, зарегистрироваться, стать админом:
bash scripts/make-admin.sh you@example.com
```

Все переменные окружения описаны в `.env.example`.

---

## Как это работает

```
Браузер  →  storm-id-ui  →  Kratos  →  Postgres
                          (вход / регистрация / настройки)
           storm-id-ui  →  Hydra   →  Postgres
                          (OAuth2 потоки / управление клиентами)
           storm-id-ui  →  Keto    →  Postgres
                          (RBAC: у кого какая роль)
```

Все запросы проходят через единый middleware Next.js 16 (`proxy.ts`), который обрабатывает аутентификацию, проверку прав и маршрутизацию.

RBAC‑движок живёт в **Postgres** — никаких OPL‑файлов, никаких перезапусков при изменении роли:

| Слой | Хранилище | Назначение |
|---|---|---|
| `roles` / `role_permissions` | Postgres (`stormid`) | Определения ролей, wildcard‑права |
| Namespace `StormID` | Keto | Relation‑кортежи: `StormID:<роль>#member@User:<id>` |

---

## Стек технологий

| Что | Как |
|---|---|
| **OAuth2 / OIDC** | Ory Hydra v26 |
| **Auth‑потоки** | Ory Kratos v26 |
| **Relations / RBAC** | Ory Keto v26 |
| **UI** | Next.js 16 · Feature‑Sliced Design · shadcn/ui |
| **i18n** | next-intl (EN / RU) |
| **База данных** | Postgres 15‑alpine (один инстанс, 4 базы) |

---

## Структура проекта

```
storm-id-ui/     →  Основной UI (Next.js 16, FSD)
  proxy.ts       →  Middleware (auth + RBAC + прокси API)
  app/           →  App Router: route groups + API handlers
  src/           →  Фичи, виджеты, shared‑компоненты
    shared/components/ory/  →  shadcn overrides для ORY-форм
  messages/      →  next-intl локали (en.json / ru.json)
configs/         →  Шаблоны конфигов Ory
scripts/         →  Вспомогательные скрипты
test-app/        →  Тестовое SPA для OAuth2 PKCE
```

---
