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

Welcome to **STORM ID** — the open source identity provider that makes OAuth2 / OIDC accessible to any team. One `docker compose up` command, full control over users, roles, and applications, zero vendor lock-in.

We built STORM ID on top of [Ory Stack](https://www.ory.sh) (Hydra + Kratos + Keto) and wrapped it all in a unified Next.js 16 interface with shadcn/ui. No backend to write, no config files to edit, no SaaS overhead.

## What is STORM ID?

STORM ID is a production-ready identity provider for your project. It gives you **a complete authentication and authorization infrastructure** in five minutes: an OAuth2 server, self-service flows (login, registration, password recovery), dynamic role-based access control (RBAC), two-factor authentication, and a dashboard to manage it all.

The project consists of two user-facing ports:
- **storm-id-ui** (`:4455`) — the main interface: login, registration, profile, dashboard, role and OAuth2 client management
- **test-app** (`:5173`) — a test SPA for verifying the OAuth2 PKCE flow

## Table of Contents

- [What is STORM ID?](#what-is-storm-id)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [Vulnerability Disclosure](#vulnerability-disclosure)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

- **OAuth2 / OIDC** — a full-featured OAuth2 server powered by Ory Hydra v26. Authorization code, PKCE, client credentials grants. Access & refresh tokens.
- **Self-service flows** — registration, login, password recovery, email verification through Ory Kratos. Everything works without a custom backend — Kratos manages the flows.
- **Dynamic RBAC** — Discord-style role system: roles with wildcard permissions (`admin:*`, `admin:dashboard.view`), position-based hierarchy, system roles (`@owner`, `@everyone`). Manage from the dashboard, no restarts needed.
- **2FA / TOTP** — authenticator app QR codes, backup recovery codes, AAL2 login with method selection (TOTP or recovery code).
- **OAuth2 client management** — every user can create, edit, and delete their own applications. Supports public (PKCE) and confidential clients.
- **Token inspector** — introspect, debug, and revoke OAuth2 tokens directly from the dashboard.
- **Session management** — view active sessions, force termination.
- **RBAC dashboard** — manage users, roles, assign and revoke permissions through the interface.
- **i18n** — two languages: Russian (default) and English.

## Tech Stack

| Component | Technology |
|-----------|-----------|
| OAuth2 / OIDC | Ory Hydra v26.2.0 |
| Authentication | Ory Kratos v26.2.0 |
| RBAC relations | Ory Keto v26.2.0 |
| UI | Next.js 16 · Feature-Sliced Design · shadcn/ui |
| i18n | next-intl (EN / RU) |
| Database | Postgres 15-alpine (4 databases: kratos, hydra, keto, stormid) |
| Infrastructure | Docker Compose |

## Architecture

All requests go through a single Next.js 16 middleware (`proxy.ts`) that handles authentication, permission checks, and proxying to Ory services.

```
Browser → proxy.ts → storm-id-ui → Kratos (login / register / settings)
                                    → Hydra (OAuth2 flows)
                                    → Keto (RBAC check)
                                           ↓
                                      Postgres (4 databases)
```

**RBAC** is built on Postgres + Keto:

| Layer | Storage | Purpose |
|-------|---------|---------|
| `roles` / `role_permissions` | Postgres (`stormid`) | Role definitions, wildcard permissions |
| Namespace `StormID` | Keto | Relation tuples: who has which role |

Roles are defined in Postgres (not OPL) — edit without rebuilding containers. Keto is used solely as a relation store (who belongs to which role) via the object-as-role pattern.

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/stormhead-org/storm-id
cd storm-id

# 2. Configure environment
cp .env.example .env
# Generate secrets (or use generate-config.sh):
#   openssl rand -hex 32  → HYDRA_SECRETS_SYSTEM
#   openssl rand -hex 32  → HYDRA_SECRETS_COOKIE
#   openssl rand -hex 32  → HYDRA_OIDC_PAIRWISE_SALT
#   openssl rand -hex 32  → KRATOS_SECRETS_COOKIE
#   openssl rand -hex 16  → KRATOS_SECRETS_CIPHER (32 hex chars!)
#   openssl rand -hex 32  → HYDRA_STATE_SECRET
#   openssl rand -hex 32  → POSTGRES_PASSWORD
# Or simply:
bash scripts/generate-config.sh --dev

# 3. Start the stack
docker compose -f docker-compose.dev.yml up -d --build

# 4. Open http://localhost:4455, register a new account

# 5. Grant yourself admin rights
bash scripts/make-admin.sh your@email.com
```

See [AGENTS.md](AGENTS.md) for detailed developer documentation.

## Project Structure

```
storm-id-ui/     →  Main UI (Next.js 16, FSD)
  proxy.ts       →  Middleware (auth + RBAC + API proxy)
  app/           →  App Router: route groups + API handlers
  src/           →  Features, widgets, shared components
    shared/components/ory/  →  shadcn overrides for ORY forms
  messages/      →  next-intl locales (en.json / ru.json)
configs/         →  Ory configuration templates
  kratos/        →  Kratos config (kratos.yaml, identity.schema.json)
  hydra/         →  Hydra config (hydra.yaml)
  keto/          →  Keto config (keto_namespaces.ts, keto.yaml)
scripts/         →  Utility scripts
  generate-config.sh  →  Generate configs from .env
  seed.sh        →  Create tables and system roles
  make-admin.sh  →  Assign @owner by email
  reset-db.sh    →  Full database reset
test-app/        →  Test SPA for OAuth2 PKCE flow
```

## Development

Key commands:

```bash
# storm-id-ui (hot reload outside Docker)
cd storm-id-ui
bun run dev --port 4455    # dev server
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

Golden rule: **always use `-f docker-compose.dev.yml`**. Running without the flag merges dev + prod configs and breaks port mappings.

## Contributing

We welcome pull requests on any issue. If you find a bug or have a feature suggestion, open an issue or submit a PR.

AI-assisted pull requests are welcome, but slop will be rejected. All submissions must pass the linter (`bun run lint`) and build (`bun run build`).

Before contributing, please read [AGENTS.md](AGENTS.md) — it documents the architecture, key decisions, and the gotchas you will definitely forget.

## Vulnerability Disclosure

If you discover a security vulnerability in STORM ID, please open an issue (without disclosing details publicly) or contact the maintainers directly.

## Acknowledgements

- [Ory](https://www.ory.sh) — for Hydra, Kratos, and Keto, the foundation of our stack
- [shadcn/ui](https://ui.shadcn.com) — for components that make the UI consistent
- [Twemoji](https://github.com/twitter/twemoji) — for the ⚡ icon (if used via emoji)

## License

STORM ID is licensed under the **GNU Affero General Public License v3.0**. See [LICENSE](LICENSE) for details.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3, or (at your option) any later version.

---

<p align="center">
  <strong>Happy Coding</strong> ❤️
  <br>
  <br>
  <a href="#table-of-contents">⬆ Back to Top</a>
</p>
