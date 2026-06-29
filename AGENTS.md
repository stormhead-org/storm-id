# STORM ID

Локальный OAuth2-стек: Ory Hydra + Kratos + Keto (v26.2.0), Unified UI на Next.js 16 (**storm-id-ui**).

**README.md** — production deployment guide (шаблон с `yourdomain.com`). Фактическое состояние репозитория — только локальный dev-стенд без Nginx/SSL.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

`proxy.ts` (не `middleware.ts`) — Next.js 16 конвенция. Ошибка сборки при наличии обоих.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:shadcn-rules -->

# UI Components (storm-id-ui)

**Всегда** используй shadcn/ui для UI компонентов. Не пиши компоненты с нуля.

**Порядок работы:**

1. Загрузи скил `.agents/skills/shadcn/SKILL.md` через `skill` tool
2. Проверь установленные компоненты: `cd storm-id-ui && bunx shadcn@latest info`
3. Ищи существующие компоненты: `cd storm-id-ui && bunx shadcn@latest search`
4. Добавляй через CLI: `cd storm-id-ui && bunx shadcn@latest add <component>`
5. Получай документацию: `cd storm-id-ui && bunx shadcn@latest docs <component>`

**Запрещено:**

- Писать кастомные компоненты, если есть аналог в shadcn/ui
- Использовать raw HTML элементы вместо shadcn компонентов (например, `<div>` вместо `<Card>`, `<hr>` вместо `<Separator>`)
- Игнорировать скил `shadcn` при работе с UI

<!-- END:shadcn-rules -->

---

# Архитектура

Два пользовательских порта:
- **storm-id-ui** (Next.js 16 / FSD / shadcn) `:4455` (внутренний `:3000`) — self-service flows (login/register/recovery/settings) + админ-дашборд с Postgres RBAC
- **test-app** (Express) `:5173` — тестовое SPA для проверки OAuth2 PKCE flow

Внутренние сервисы:
- **Hydra** v26.2.0 `:4444` (public) / `:4445` (admin)
- **Kratos** v26.2.0 `:4433` (public) / `:4434` (admin)
- **Keto** v26.2.0 `:4466` (read) / `:4467` (write)
- **Postgres** — единая БД (4 базы: kratos, hydra, keto, stormid)

Поток: test-app → Hydra → storm-id-ui (`/api/hydra/auth/login`) → Kratos → регистрация/логин → storm-id-ui (`/api/hydra/auth/consent`) → callback с токенами.

---

# FSD (Feature-Sliced Design) — storm-id-ui

**Слои (снизу вверх):**

```
shared   → entities → features → widgets → pages → app
```

**Структура `storm-id-ui/src/`:**

| Слой | Назначение |
|------|-----------|
| `app/` | Провайдеры, layouts, глобальные стили |
| `pages/` | Страницы (экспорт через корневое `app/` для Next.js) |
| `widgets/` | Композитные блоки (header, sidebar) |
| `features/` | Фичи (roles, settings, identities) |
| `entities/` | Бизнес-сущности (Role, User) |
| `shared/` | UI компоненты (shadcn), утилиты, API клиент, конфиги, хуки |

**Правило FSD:** импорт только снизу вверх (shared → entities → features → ...). Нет горизонтальных импортов между слайсами одного слоя.

**Entry points:**

- `storm-id-ui/app/` — Next.js App Router (роуты reference страницы из `src/pages/` через реэкспорты или рендерят напрямую)
- `storm-id-ui/src/pages/` — страницы по FSD (admin, clients, dashboard, identities, kratos, messages, sessions, tokens, welcome)
- `storm-id-ui/src/app/providers/` — провайдеры (QueryProvider)
- `storm-id-ui/src/shared/config/` — API конфигурация

**Актуальная структура `storm-id-ui/src/widgets/` (только с файлами):**

| Директория | Файлы |
|---|---|
| `navigation/` | `AdminHeader.tsx`, `AdminSidebar.tsx` |
| `profile/` | `ui/profile-settings.tsx` |
| `roles/` | `index.ts` (barrel) |

Остальные (`clients/`, `dashboard/`, `identities/`, `messages/`, `sessions/`, `tokens/`, `welcome/`, `admin-apps/`, `consent/`) — пустые, рендер идёт напрямую через `features/` + `shared/`.

**Актуальная структура `storm-id-ui/src/features/`:**

| Директория | Назначение |
|---|---|
| `analytics/` | Хуки для дашборда |
| `identities/` | Хуки для CRUD пользователей |
| `messages/` | Хуки для списка сообщений |
| `oauth2-clients/` | Компоненты + хуки для управления OAuth2 клиентами |
| `oauth2-consent/` | Хуки для consent flow |
| `oauth2-tokens/` | Хуки + zustand store для интроспекции токенов |
| `roles/` | API, хуки, lib — наиболее полная фича (CRUD ролей) |
| `sessions/` | Хуки для сессий |

**Shadcn aliases (из `storm-id-ui/components.json`):**

- `@/src/shared/ui` — shadcn/ui компоненты (не используется; реальный путь `@/src/shared/components/ui`)
- `@/src/shared/components` — кастомные компоненты
- `@/src/shared/lib` — утилиты, конфиги
- `@/src/shared/hooks` — React хуки
- `@/src/shared/lib/utils` — `cn()` утилита
- `@/*` → `./` (корень проекта)

---

# RBAC (Dynamic Discord-style Role System)

Роли и разрешения хранятся в Postgres (`stormid` database), а не в Keto OPL. Keto используется только как relation-хранилище (кто какой ролью обладает).

### Keto: object-as-role pattern
- Namespace `StormID` с единственным relation `member`
- Tuple: `StormID:<roleId>#member@User:<uuid>`
- roleId — это UUID роли из Postgres (не `admin`, не `owner`)

### Postgres: role definitions
- `roles` table: id (UUID), name, description, is_system, is_default, position, created_at, updated_at
- `role_permissions` table: role_id, permission (PK)

### Permission wildcard hierarchy (Discord-style)
`*` > `admin:*` > `admin:dashboard.*` > `admin:dashboard.view`

### System roles
- `@owner` — `is_system=true, is_default=false`, position=10000, permission=`admin:*`
  - Полный доступ ко всему
  - Всегда locked (нельзя перетаскивать, редактировать или удалять)
  - Name immutable, permissions immutable
- `@everyone` — `is_system=true, is_default=true`, position=0, permission=none
  - Есть у всех пользователей по умолчанию
  - Автоматически назначается при регистрации (через `ensureDefaultRoles` в submit/route.ts)
  - Можно редактировать permissions (требуется `admin:roles.default.manage`)

### Default roles
- Роль с `is_default=true` автоматически назначается всем новым пользователям
- `@everyone` — системная default-роль
- Пользовательские default-роли можно удалять и редактировать без ограничений
- Управление default-ролями требует `admin:roles.default.manage`

### Role hierarchy (position)
- Чем выше position, тем могущественнее роль
- Нельзя управлять/манипулировать ролями с position >= вашей maxPosition
- `@owner` всегда locked (не участвует в иерархии)
- Locked-роли рендерятся как `LockedRoleCard` (серый фон, Lock иконка)
- Все роли рендерятся в одном списке, сортированном по position DESC

---

# OAuth2 Clients (Applications)

Пользователи управляют своими OAuth2-приложениями:

### Owner-based access control (proxy.ts)
- `GET /clients?owner={identityId}` — просмотр **своих** приложений (isOwnResource bypass)
- `GET /clients/{id}` — просмотр **своего** приложения (isOwnClient bypass)
- `PUT /clients/{id}` — редактирование **своего** приложения (Route Handler + owner check)
- `DELETE /clients/{id}` — удаление **своего** приложения (isOwnClient bypass)
- Чужие приложения → проверка `admin:clients.view` / `admin:clients.manage`

### Owner injection
- При создании (POST) и редактировании (PUT) `owner` принудительно подставляется из сессии сервером
- Клиент не может передать `owner` вручную — сервер перезаписывает
- Для уже созданных приложений без owner — удалить и создать заново

### Client Route Handlers
- `POST /api/hydra-admin/clients` — создание с owner injection
- `PUT /api/hydra-admin/clients/[id]` — редактирование с верификацией владельца
- `POST /api/hydra-admin/clients/[id]/regenerate-secret` — регенерация секрета (guard: возвращает 400 для публичных клиентов)

---

# 2FA / TOTP Workflow

Двухфакторная аутентификация объединена в одну секцию «Two-Factor Authentication»:

### Enable flow
1. QR-код → ввод кода из приложения → TOTP включён
2. **Автоматически** генерируются backup-коды → показываются пользователю → сохраняются
3. Без 2FA backup-коды не существуют

### Disable flow
1. Кнопка «Remove 2FA» → удаляет TOTP **и** backup-коды (через Kratos Admin API)
2. Backup-коды инвалидируются — больше не запрашиваются при логине

### AAL2 login
- `createNativeLoginFlow({ aal: "aal2", xSessionToken })` — не `refresh: true`
- Показывает только second-factor ноды (TOTP/WebAuthn/lookup) — без пароля
- Метод можно переключить: TOTP ↔ backup code
- Guard: если доступен только `lookup_secret` без TOTP/WebAuthn → редирект в настройки

---

# Ключевые решения (почему, а не что)

- `proxy.ts` (не `middleware.ts`) — Next.js 16 конвенция. Ошибка сборки при наличии обоих.
- `login_challenge` через encrypted state cookie (jose JWE), а не in-memory map — переживает рестарты.
- identity data (email/name) для ID Token — через Kratos Admin API в момент `acceptConsent`, не из stateStore (рассинхронизация).
- Два URL Hydra в test-app: `hydra_server_url=http://hydra:4444` (сервер-side token exchange) / `hydra_browser_url=http://localhost:4444` (браузерные редиректы). Пользователь задаёт Server URL через форму UI (fallback — Browser URL).
- PKCE отключён (`enforced: false`) для dev. Для прода — `true`.
- RBAC: Postgres + Keto (object-as-role pattern), а не только Keto OPL — позволяет редактировать роли без пересборки контейнера.
- Proxy.ts проксирует Kratos/Hydra/Keto API и защищает операции через `API_PERMISSIONS` мапу с проверкой `checkApiPermission()` + hierarchy check.
- `roleNames` (UUID → name) мапа возвращается в ответе session validate endpoint — клиент отображает имена, а не UUID.
- `getUserRoleIds()` — вынесена общая Keto-логика, используется в `checkApiPermission`, `getIdentityMaxPosition`, `checkPermissions`.
- `isOwnClient` bypass в `handleProxyWithCheck` — для GET/DELETE своих приложений (pre-fetch в Hydra, проверка `client.owner === identityId`).
- Owner injection для POST/PUT вынесен в отдельные Route Handlers (не в middleware) — middleware не умеет надёжно мутировать тело запроса.
- Sonner toasts — `useMutation.onSuccess`/`onError` в хуках + `toast()` в компонентах для всех CRUD-операций.
- webauthn.js дедуплицирован модульным `Set` — один экземпляр скрипта, без DOM-конфликтов.
- **ORY button translation**: submit-кнопки в Settings/Login/Registration идут через ORY Node → `MyNodeButton` → `useIntl()` + `intl.formatMessage()` с ORY message ID (1070003→"Сохранить"). Кастомные кнопки (AuthMethodListItem, Remove 2FA, Unlink, Remove) — через next-intl `useTranslations()` и ключи `auth.methods.*`, `settings.*`.
- **Settings page CSS bypass**: `<Settings children={<OrySettingsCard />}>` — передача children пропускает `<div class="ory-elements">` обёртку, чей CSS-reset (border-radius:0, background:transparent) сбивает shadcn-стили.
- **All buttons size="lg" + min-h-10**: единый размер 40px для всех кнопок на всех ORY-страницах (submit, SSO, method list, action buttons).

---

# Гвозди, которые точно забудете

**Hydra:**
- Запуск с `--dev` (без HTTPS issuer). `--dangerous-force-http` невалиден.
- Public client → `token_endpoint_auth_method: none`. Иначе `invalid_client` при token exchange.
- После `docker compose down/up` БД Hydra теряется → клиентов надо перерегистрировать.
- Owner клиента при создании **не сохраняется** сам — нужен явный `owner` в теле запроса.

**Kratos:**
- `session` config на верхнем уровне (не под `selfservice`).
- `serve.public.base_url: http://localhost:4433/` обязателен — иначе Kratos генерирует action-URL с Docker hostname (`PR_END_OF_FILE_ERROR`).
- `allowed_return_urls` не поддерживает `/**` glob.
- AAL2 сессия: `useSession()` хук детектит 403 и редиректит на `/login?aal=aal2`. Серверная валидация в `kratos-session.ts` обрабатывает `session_aal2_required`.
- Privileged session refresh (403 `session_refresh_required` после включения TOTP): Kratos редиректит на `/login?flow=...`. `login/page.tsx` видит `?flow=` и передаёт в `KratosAuthShell`. `KratosAuthShell` фетчит существующий browser flow через `getLoginFlow`, рендерит форму без `onSubmit` — форма POST'ится напрямую в Kratos (browser submit). После успешного логина Kratos редиректит обратно в settings flow.

**@ory/nextjs + @ory/elements-react (Nail gun):**
- `getLoginFlow`/`getRegistrationFlow`/`getRecoveryFlow`/`getVerificationFlow` redirects to `orySdkUrl()` (= `NEXT_PUBLIC_ORY_SDK_URL` = `http://kratos:4433`) when no `?flow=` param — browser can't resolve Docker hostname. **Fix**: check `!searchParams.flow` before calling `getXxxFlow`, redirect manually to the **public** URL (from request `Host` header): `${protocol}://${host}/self-service/{flow}/browser`. Applied in login, registration, recovery, verification pages.
- `createOryMiddleware` (proxy.ts) can also throw "Unable to connect" / "ConnectionRefused" on `/self-service/*/browser` if Kratos is unreachable (wrong Docker network).
- **Client-side `Unable to determine SDK URL`**: `@ory/elements-react`'s `getSDKUrl()` checks `process.env["NEXT_PUBLIC_ORY_SDK_URL"]` at client runtime. Since Next.js doesn't inline `NEXT_PUBLIC_*` for computed property access in `node_modules`, the value must come from `config.sdk.url`. **Fix**: set `sdk.url: process.env.NEXT_PUBLIC_ORY_SDK_URL || ""` in `ory.config.ts`, and pass `NEXT_PUBLIC_ORY_SDK_URL=http://localhost:4455` as a Docker build arg (`--build-arg`). This inlines the public proxy URL in `ory.config.ts`'s compiled output → `useSDKConfig()` returns early without calling `getSDKUrl()`. Server-side `orySdkUrl()` reads the RUNTIME `NEXT_PUBLIC_ORY_SDK_URL=http://kratos:4433` from container env var.
- **Settings page CSS bypass**: `<Settings children={<OrySettingsCard />}>` — передача children пропускает `<div class="ory-elements">` обёртку, чей CSS-reset (border-radius:0, background:transparent) сбивает shadcn-стили.
- **Button sizing**: все кнопки на ORY-страницах — `size="lg"` + `min-h-10` (40px). Submit-кнопки (Save, Submit, Continue) через `intl.formatMessage()`. Custom-кнопки (Remove 2FA, Unlink) через `useTranslations()`.
- **intl.locale**: на `/profile` `config.intl.locale = getLocale()` из next-intl. Login/Registration/Recovery/Verification — без locale (дефолт "en"), все надписи через `intl.formatMessage()` из react-intl.

**Docker Compose network hell:**
- `docker-compose.dev.yml` — **ОСНОВНОЙ** файл для разработки. `docker-compose.yml` — production (порты закомментированы, `NODE_ENV=production`, external network).
- **Не использовать `docker compose up` без `-f`** — merge dev+prod ломает порты, `NODE_ENV` и секции `build.args`.
- **Workaround** для compose merge: `docker run -d ... <все env> storm-id-storm-id-ui` (только если merge сломался).
- `docker compose run --no-deps --service-ports` также не публикует порты надёжно при merge.
- **Сетевое правило**: все контейнеры должны быть в одной Docker-сети для DNS-резолва (`postgres`, `kratos`, `hydra`, `keto`). `docker compose down` + `docker compose up -d` — safest.

**storm-id-ui:**
- Self-service flows (`(kratos)/`) и админка (`(app/`), `(admin/)`) — разные layout-группы.
- Session валидируется в `proxy.ts` (middleware) + дублируется `useSession()` hook для reactivity.
- Settings flow: `createNativeSettingsFlow` (API, без редиректов), а не browser flow (Axios следует 302).
- Session token из `ory_kratos_session` cookie — передавать как `xSessionToken`.
- Body для `method=profile` — `traits` как вложенный объект (`{ method, csrf_token, traits: { email, name } }`), не плоские ключи `traits.email`.
- `staleTime: 30_000` для `useSession()` (хук), `staleTime: Infinity` для settings flow — иначе React Query спамит Kratos login browser каждые 15с.
- **Backup recovery codes (`lookup_secret`)** — серверные route handlers (`/api/self/settings/lookup/generate`, `/api/self/settings/lookup/confirm`) через Kratos SDK с `xSessionToken`. Native API (`createNativeSettingsFlow` + `updateSettingsFlow` с `lookup_secret_regenerate: true`) возвращает коды в `text` nodes. Последовательность: generate → получаем коды + flowId → confirm с тем же flowId → `state: "success"`. Работает только с AAL2-сессией (иначе 403 `session_aal2_required`). `X-Session-Token` принимает только plain API token (`ory_st_*`), не browser cookie.
- **TOTP QR с email вместо UUID**: Kratos v26.2.0 генерирует `otpauth://` URI с UUID пользователя как account name. Свойства конфига нет. ORY image node отображается как есть в `settings.tsx` через `<Node node={totpImage} />`.
- **cookie reading bug**: `request.cookies.get()` не работает для POST в Next.js 16 middleware. Использовать прямой парсинг `Cookie` заголовка.
- **NextResponse.json вместо body reconstruction**: в isOwnClient fetch для GET использовать `NextResponse.json(client)` (уже распарсенный), не `clientRes.arrayBuffer()` (ERR_BODY_ALREADY_USED).
- **Owner не сохраняется при PUT**: Hydra сбрасывает `owner` в пустую строку, если поле не передано в теле PUT. Route Handler для PUT принудительно добавляет `owner`.

**test-app:**
- `express-session`: `saveUninitialized: true` — иначе codeVerifier не сохранится между `/login` и `/callback`.
- Token exchange: Basic Auth (`client_secret_basic`) если есть client_secret, иначе PKCE (public).
- `hydra_server_url` задаётся через форму UI (Server URL field), fallback — `hydra_browser_url`. Для Docker-internal token exchange использует `http://hydra:4444`, для браузерных редиректов — `http://localhost:4444`.

---

# Команды

## Docker

```bash
# Пересборка и запуск всего стека (всегда используй -f docker-compose.dev.yml)
docker compose -f docker-compose.dev.yml up -d

# Пересборка и запуск одного сервиса (build.args уже в compose)
docker compose -f docker-compose.dev.yml up -d storm-id-ui
docker compose -f docker-compose.dev.yml up -d test-app

# Логи
docker compose -f docker-compose.dev.yml logs -f storm-id-ui

# Регистрация OAuth2 клиента
bash scripts/register-client.sh 'App Name' http://localhost:5173/callback --public

# Назначение admin (@owner) через Keto
bash scripts/make-admin.sh user@email.com
```

## Hydra CLI

```bash
docker compose exec hydra hydra list oauth2-clients --endpoint http://localhost:4445
docker compose exec hydra hydra delete oauth2-client <ID> --endpoint http://localhost:4445
```

## Keto

```bash
docker compose exec keto keto relation-tuple get --namespace StormID
docker compose exec keto keto relation-tuple check --namespace StormID --object <role-uuid> --relation member --subject-id <user-uuid>
```

## База данных

```bash
# Полный сброс БД (сбрасывает все 4 базы, миграции, сид ролей)
bash scripts/reset-db.sh

# Seed только stormid ролей
bash scripts/seed-roles.sh
```

## storm-id-ui (dev-режим вне Docker, hot-reload)

```bash
cd storm-id-ui
bun run dev --port 4455    # dev-сервер
bun run build               # production build
bun run start               # production server
```

## Линтер / Typecheck

**storm-id-ui** использует oxlint + oxfmt + tsc:

```bash
cd storm-id-ui
bun run lint        # oxlint
bun run lint:fix    # oxlint --fix
bun run fmt         # oxfmt
bun run fmt:check   # oxfmt --check
bun run build       # tsc + next build (финальная верификация)
```

**Порядок верификации кода:** `bun run build` (или `bun run lint:fix` → `bun run fmt` → `bun run build`)

---

# Файлы, которые нужно знать

## Инфраструктура
- `docker-compose.dev.yml` — **основной** файл для разработки (10 сервисов, порты наружу, `NODE_ENV=development`)
- `docker-compose.yml` — production (порты закомментированы, `NODE_ENV=production`, external network)
- `configs/kratos/kratos.yaml` — v26.2.0, `serve.public.base_url` критичен
- `configs/hydra/hydra.yaml` — PKCE off, CORS :5173/:4455/:3000, pairwise
- `configs/keto/keto_namespaces.ts` — namespace StormID, single `member` relation

## storm-id-ui (активный UI)

### Middleware
- `storm-id-ui/proxy.ts` — Next.js 16 middleware: аутентификация, Postgres RBAC + hierarchy check, прокси Kratos/Hydra/Keto API, isOwnClient/isOwnIdentity bypass, `getUserRoleIds()` для дедупликации Keto-логики

### Ключевые модули (`storm-id-ui/src/shared/`)
- `lib/db.ts` — pg pool + `ensureSchema()` (ленивое создание таблиц roles/role_permissions + seed)
- `lib/permissions.ts` — core RBAC engine: `getUserRoles`, `getRolePermissions`, `getUserMaxPosition`, `canGrantPermissions`, `requirePermission`, `ensureDefaultRoles`
- `lib/permission-utils.ts` — pure `matchPermission()` для клиента
- `lib/kratos-frontend.ts` — Kratos FrontendApi клиент
- `lib/kratos-session.ts` — серверная валидация сессии (toSession с xSessionToken)
- `lib/hydra-auth.ts` — Hydra Admin API: login/consent/logout flow, encrypted state cookie (jose JWE)
- `types/session.ts` — `SessionProfile` с roles[], permissions[], maxPosition, roleNames
- `hooks/useSession.ts` — клиентский хук сессии с AAL2 handling
- `components/navigation/AdminSidebar.tsx` — сайдбар (shadcn, RBAC-фильтрация)
- `components/navigation/AdminHeader.tsx` — хэдер (theme toggle, avatar dropdown, logout)

### ORY shadcn overrides (`storm-id-ui/src/shared/components/ory/`)

Все ORY-компоненты заменены на shadcn/ui. 6 файлов:

| Файл | Описание |
|---|---|
| `base.tsx` | Базовые оверрайды: Card, Form, Node (Input, Button, SsoButton, Checkbox, Select, Text, Anchor, Image, Label), Message (Toast, Root, Alert), Page.Header → null. Submit-кнопки используют `intl.formatMessage()` через ORY реакт-интл. SSO-кнопки и метод-лист — `useTranslations()` из next-intl. |
| `login.tsx` | Card.Footer — ссылки «Забыли пароль?» + «Нет аккаунта?». |
| `registration.tsx` | Card.Footer — ссылка «Уже есть аккаунт?». |
| `recovery.tsx` | Card.Footer — ссылка «Вспомнили пароль?». |
| `verification.tsx` | Card.Footer — ссылка «Уже подтверждено?». |
| `settings.tsx` | Полный рендер /profile: Card.SettingsSection (Card → mb-6), SettingsSectionContent (CardHeader + CardContent), SettingsSectionFooter (CardFooter), Form.TotpSettings, Form.SsoSettings, Form.WebauthnSettings, Form.PasskeySettings, Form.RecoveryCodesSettings. Все кнопки size="lg" + min-h-10, текст через useTranslations(). |

### i18n (`next-intl` v4.13.0)

| Файл | Назначение |
|---|---|
| `i18n/request.ts` | `getRequestConfig` — импорт `messages/{locale}.json` |
| `i18n/locale.ts` | Определение locale из cookie `locale`, fallback `"ru"`. Поддержка `["en", "ru"]` |
| `messages/en.json` | 904 строки английских переводов |
| `messages/ru.json` | 902 строки русских переводов (default) |
| `src/shared/lib/i18n.ts` | Re-export `useTranslations`, `useLocale` из next-intl |
| `app/layout.tsx` | Root layout: `<NextIntlClientProvider locale={locale} messages={messages}>` |

Локализация кнопок: ORY submit-кнопки (Save, Submit, Verify code) переводятся через `useIntl()` + `intl.formatMessage()` — используют ORY built-in `ru_default` locale. Все кастомные кнопки (Remove 2FA, Unlink, Remove, AuthMethodListItem, SSO) — через `useTranslations()` из next-intl.

### Route groups (`storm-id-ui/app/`)
- `(kratos)/` — self-service: login, registration, recovery, verification, error, consent
  - login/registration/recovery/verification страницы содержат фикс `!searchParams.flow` — редирект на **публичный** URL (из `Host`-заголовка), не на SDK URL
- `(app)/` — пользовательские страницы: profile, sessions, clients, welcome
- `(admin)/` — админ-панель: admin/roles, dashboard, identities, messages
- `api/` — Route Handlers:

### API Route Handlers (`storm-id-ui/app/api/`)
| Path | Описание |
|------|----------|
| `api/admin/roles/` | CRUD ролей (+ permission-catalog, reorder) |
| `api/admin/roles/[roleId]/` | Индивидуальная роль |
| `api/admin/role-assignments/` | Назначение ролей пользователям |
| `api/hydra/auth/login/` | Hydra OAuth2 Login flow |
| `api/hydra/auth/consent/` | Hydra OAuth2 Consent flow (GET + POST) |
| `api/hydra/auth/logout/` | Hydra OAuth2 Logout flow |
| `api/hydra/auth/state/` | Consent request state для UI |
| `api/hydra-admin/clients/` | Создание клиента (POST, owner injection) |
| `api/hydra-admin/clients/[id]/` | Редактирование клиента (PUT, owner check) |
| `api/hydra-admin/clients/[id]/regenerate-secret/` | Регенерация client secret (POST) |
| `api/kratos/session/validate/` | Валидация сессии + RBAC |
| `api/kratos/logout/` | Выход через Kratos |
| `api/keto/identities/` | Keto relation tuples для identity |
| `api/self/auth/flow/` | Создание login/register/recovery/verification flow |
| `api/self/auth/submit/` | Сабмит формы + `ensureDefaultRoles` после регистрации |
| `api/self/settings/flow/` | Settings flow |
| `api/self/settings/submit/` | Сабмит настроек |
| `api/self/settings/lookup/*/` | Backup recovery codes (generate + confirm) |
| `api/self/settings/two-factor/` | Удаление TOTP + backup codes (DELETE) |
| `api/self/webauthn.js/` | WebAuthn скрипт (прокси из Kratos) |
| `api/identity-email/` | Разрешение email по identity UUID |

## Скрипты
- `scripts/register-client.sh` — public (PKCE) / confidential clients
- `scripts/make-admin.sh` — назначение @owner через lookup по email + Keto API
- `scripts/seed-roles.sh` — создаёт таблицы и сидит @owner/@everyone
- `scripts/reset-db.sh` — полный сброс: дроп всех 4 БД, миграции, сид ролей
- `scripts/init-db.sql` — 4 БД: kratos, hydra, keto, stormid

## Референсы
- `test-app/server.js` — Express SPA, PKCE S256

---

# Локальный запуск

```bash
cp .env.example .env
# Сгенерировать секреты (см. .env.example)
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up -d
bash scripts/register-client.sh 'Test App SPA' http://localhost:5173/callback --public
# Открыть http://localhost:4455
# После регистрации: bash scripts/make-admin.sh <email> для @owner
```

---

# Permission Catalog

| Permission | Label | Group |
|---|---|---|
| `admin:*` | System: Full Access | System |
| `admin:dashboard.view` | Dashboard: View | Dashboard |
| `admin:dashboard.manage` | Dashboard: Manage | Dashboard |
| `admin:users.view` | Users: View | Users |
| `admin:users.create` | Users: Create | Users |
| `admin:users.edit` | Users: Edit | Users |
| `admin:users.delete` | Users: Delete | Users |
| `admin:roles.view` | Roles: View | Roles |
| `admin:roles.manage` | Roles: Manage | Roles |
| `admin:roles.default.manage` | Roles: Manage Default (@everyone) | Roles |
| `admin:sessions.view` | Sessions: View | Sessions |
| `admin:sessions.revoke` | Sessions: Revoke | Sessions |
| `admin:clients.view` | Clients: View | Clients |
| `admin:clients.create` | Clients: Create | Clients |
| `admin:clients.manage` | Clients: Manage | Clients |
| `admin:messages.*` | Messages: All | Messages |

---

# Sonner Toasts

Все CRUD-операции покрыты всплывающими уведомлениями через sonner shadcn/ui:

- **Хуки**: `onSuccess`/`onError` в `useMutation` (roles, identities, clients, sessions, tokens)
- **Компоненты**: `toast.success()`/`toast.error()` в catch-блоках и success-путях
- **i18n**: `toasts.success.*` / `toasts.error.*` в `en.json` + `ru.json`
- `<Toaster />` в `app/layout.tsx`
