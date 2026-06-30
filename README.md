<div align="center">
  <br>
  <h1>STORM ID ⚡</h1>
  <strong>Self-hosted identity. One command.</strong>
</div>
<br>
<p align="center">
  <a href="README_EN.md">English</a> | <a href="README.md">Русский</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/Ory_Stack-v26-5528FF" alt="Ory Stack v26">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js 16">
  <img src="https://img.shields.io/badge/Postgres-15-336791" alt="Postgres 15">
  <img src="https://img.shields.io/badge/Docker-ready-2496ED?logo=docker" alt="Docker ready">
</p>

Добро пожаловать в **STORM ID** — опенсорсный identity provider, который делает OAuth2 / OIDC доступным для любой команды. Одна команда `docker compose up`, полный контроль над пользователями, ролями и приложениями, никакой привязки к вендору.

Мы построили STORM ID на базе [Ory Stack](https://www.ory.sh) (Hydra + Kratos + Keto) и обернули всё в единый интерфейс на Next.js 16 с shadcn/ui. Без бэкенда, без конфигов, без переплаты за SaaS.

## Что такое STORM ID?

STORM ID — это готовый к использованию identity provider для вашего проекта. Он даёт вам **всю инфраструктуру аутентификации и авторизации** за пять минут: OAuth2-сервер, самообслуживаемые формы (вход, регистрация, восстановление пароля), динамическую ролевую модель (RBAC), двухфакторную аутентификацию и дашборд для управления всем этим.

Проект состоит из двух пользовательских портов:
- **storm-id-ui** (`:4455`) — основной интерфейс: логин, регистрация, профиль, дашборд, управление ролями и OAuth2-приложениями
- **test-app** (`:5173`) — тестовое SPA для проверки OAuth2 PKCE flow

## Содержание

- [Что такое STORM ID?](#что-такое-storm-id)
- [Возможности](#возможности)
- [Стек технологий](#стек-технологий)
- [Как это работает](#как-это-работает)
- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [Разработка](#разработка)
- [Участие](#участие)
- [Сообщение об уязвимости](#сообщение-об-уязвимости)
- [Благодарности](#благодарности)
- [Лицензия](#лицензия)

## Возможности

- **OAuth2 / OIDC** — полноценный OAuth2-сервер на Ory Hydra v26. Поддержка authorization code, PKCE, client credentials. Access & refresh токены.
- **Self-service flows** — регистрация, вход, восстановление пароля, подтверждение email через Ory Kratos. Всё работает без бэкенда — Kratos сам управляет flow'ами.
- **Dynamic RBAC** — ролевая модель в стиле Discord: роли с wildcard-правами (`admin:*`, `admin:dashboard.view`), иерархия по позиции, системные роли (`@owner`, `@everyone`). Управление из дашборда, без перезапусков.
- **2FA / TOTP** — QR-коды из приложения-аутентификатора, backup-коды для восстановления, AAL2-логин с выбором метода (TOTP или recovery code).
- **Управление OAuth2-клиентами** — каждый пользователь может создавать, редактировать и удалять свои приложения. Поддержка публичных (PKCE) и конфиденциальных клиентов.
- **Token inspector** — интроспекция, отладка и отзыв OAuth2-токенов прямо из дашборда.
- **Управление сессиями** — просмотр активных сессий, принудительное завершение.
- **RBAC-дашборд** — управление пользователями, ролями, назначение и отзыв разрешений через интерфейс.
- **i18n** — два языка: русский (по умолчанию) и английский.

## Стек технологий

| Компонент | Технология |
|-----------|-----------|
| OAuth2 / OIDC | Ory Hydra v26.2.0 |
| Аутентификация | Ory Kratos v26.2.0 |
| RBAC relations | Ory Keto v26.2.0 |
| UI | Next.js 16 · Feature-Sliced Design · shadcn/ui |
| i18n | next-intl (EN / RU) |
| База данных | Postgres 15-alpine (4 базы: kratos, hydra, keto, stormid) |
| Инфраструктура | Docker Compose |

## Как это работает

Все запросы проходят через единый middleware Next.js 16 (`proxy.ts`), который обрабатывает аутентификацию, проверку прав и прокси к Ory-сервисам.

```
Browser → proxy.ts → storm-id-ui → Kratos (login / register / settings)
                                    → Hydra (OAuth2 flows)
                                    → Keto (RBAC check)
                                           ↓
                                      Postgres (4 databases)
```

**RBAC** построен на связке Postgres + Keto:

| Слой | Хранилище | Назначение |
|------|-----------|-----------|
| `roles` / `role_permissions` | Postgres (`stormid`) | Определения ролей, wildcard-права |
| Namespace `StormID` | Keto | Relation-кортежи: кто какой ролью обладает |

Роли определяются в Postgres (не OPL) — можно править без пересборки контейнера. Keto используется только как relation-хранилище (кто состоит в какой роли) через object-as-role pattern.

## Быстрый старт

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/stormhead-org/storm-id
cd storm-id

# 2. Настройте окружение
cp .env.example .env
# Сгенерируйте секреты (или используйте generate-config.sh)
#   openssl rand -hex 32  → HYDRA_SECRETS_SYSTEM
#   openssl rand -hex 32  → HYDRA_SECRETS_COOKIE
#   openssl rand -hex 32  → HYDRA_OIDC_PAIRWISE_SALT
#   openssl rand -hex 32  → KRATOS_SECRETS_COOKIE
#   openssl rand -hex 16  → KRATOS_SECRETS_CIPHER (32 hex chars!)
#   openssl rand -hex 32  → HYDRA_STATE_SECRET
#   openssl rand -hex 32  → POSTGRES_PASSWORD
# Или просто:
bash scripts/generate-config.sh --dev

# 3. Запустите стек
docker compose -f docker-compose.dev.yml up -d --build

# 4. Откройте http://localhost:4455, зарегистрируйтесь

# 5. Назначьте себе права администратора
bash scripts/make-admin.sh your@email.com
```

Подробнее — в [AGENTS.md](AGENTS.md).

## Структура проекта

```
storm-id-ui/     →  Основной UI (Next.js 16, FSD)
  proxy.ts       →  Middleware (auth + RBAC + прокси API)
  app/           →  App Router: route groups + API handlers
  src/           →  Фичи, виджеты, shared-компоненты
    shared/components/ory/  →  shadcn overrides для ORY-форм
  messages/      →  next-intl локали (en.json / ru.json)
configs/         →  Шаблоны конфигов Ory
  kratos/        →  Конфигурация Kratos (kratos.yaml, identity.schema.json)
  hydra/         →  Конфигурация Hydra (hydra.yaml)
  keto/          →  Конфигурация Keto (keto_namespaces.ts, keto.yaml)
scripts/         →  Вспомогательные скрипты
  generate-config.sh  →  Генерация конфигов из .env
  seed.sh        →  Создание таблиц и системных ролей
  make-admin.sh  →  Назначение @owner по email
  reset-db.sh    →  Полный сброс всех БД
test-app/        →  Тестовое SPA для OAuth2 PKCE flow
```

## Разработка

Основные команды:

```bash
# storm-id-ui (с горячей перезагрузкой вне Docker)
cd storm-id-ui
bun run dev --port 4455    # dev-сервер
bun run lint               # oxlint
bun run build              # tsc + next build

# Docker
docker compose -f docker-compose.dev.yml logs -f storm-id-ui
docker compose -f docker-compose.dev.yml up -d storm-id-ui

# Hydra CLI
docker compose exec hydra hydra list oauth2-clients --endpoint http://localhost:4445
docker compose exec hydra hydra delete oauth2-client <ID> --endpoint http://localhost:4445

# Keto
docker compose exec keto keto relation-tuple get --namespace StormID
```

Ключевое правило: **всегда используйте `-f docker-compose.dev.yml`**. Запуск без флага смержит dev + prod конфиги и сломает порты.

## Участие

Мы приветствуем любые pull request'ы. Если вы нашли баг или хотите предложить улучшение — открывайте issue или отправляйте PR.

Поддержка AI-ассистированных PR приветствуется, но «slop» мы не принимаем. Все изменения должны проходить линтер (`bun run lint`) и сборку (`bun run build`).

Перед началом работы ознакомьтесь с [AGENTS.md](AGENTS.md) — там описана архитектура, ключевые решения и гвозди, которые вы точно забудете.

## Сообщение об уязвимости

Если вы нашли уязвимость в STORM ID, пожалуйста, напишите нам в Issues (не раскрывая детали публично) или свяжитесь с мейнтейнерами напрямую.

## Благодарности

- [Ory](https://www.ory.sh) — за Hydra, Kratos и Keto, фундамент нашего стека
- [shadcn/ui](https://ui.shadcn.com) — за компоненты, которые делают UI единообразным
- [Twemoji](https://github.com/twitter/twemoji) — за иконку ⚡ (если используется через emoji)

## Лицензия

STORM ID распространяется под лицензией **GNU Affero General Public License v3.0**. Подробнее — в файле [LICENSE](LICENSE).

Эта программа — свободное программное обеспечение: вы можете распространять и/или изменять её в соответствии с условиями GNU Affero General Public License, опубликованной Free Software Foundation, либо версии 3, либо (по вашему выбору) любой более поздней версии.

---

<p align="center">
  <strong>Happy Coding</strong> ❤️
  <br>
  <br>
  <a href="#содержание">⬆ К началу</a>
</p>
