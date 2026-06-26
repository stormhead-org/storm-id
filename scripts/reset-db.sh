#!/bin/bash
# Drop and recreate all databases, run migrations, seed roles
set -euo pipefail

if [ -f .env ]; then
  set -a; source .env; set +a
fi

POSTGRES_USER="${POSTGRES_USER:-storm}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-storm}"

echo "⚠️  This will destroy ALL data in the Postgres databases!"
read -p "Are you sure? (y/N) " confirm
if [ "$confirm" != "y" ]; then
  echo "Aborted."
  exit 1
fi

OWNER_ID=$(python3 -c "import uuid; print(uuid.uuid4())")
EVERYONE_ID=$(python3 -c "import uuid; print(uuid.uuid4())")

echo "💣 Dropping all databases..."
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d postgres <<SQL
DROP DATABASE IF EXISTS kratos;
DROP DATABASE IF EXISTS hydra;
DROP DATABASE IF EXISTS keto;
DROP DATABASE IF EXISTS stormid;
SQL

echo "🏗️  Recreating databases..."
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d postgres <<SQL
CREATE DATABASE kratos;
CREATE DATABASE hydra;
CREATE DATABASE keto;
CREATE DATABASE stormid;
SQL

echo "🗃️  Seeding stormid roles..."
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d stormid <<SQL
CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  is_system BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id VARCHAR(64) REFERENCES roles(id) ON DELETE CASCADE,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (role_id, permission)
);
INSERT INTO roles (id, name, description, is_system, is_default, position) VALUES
  ('$OWNER_ID', '@owner', 'System owner — full access', true, false, 10000),
  ('$EVERYONE_ID', '@everyone', 'Default role for all users', true, true, 0)
ON CONFLICT (id) DO NOTHING;
INSERT INTO role_permissions (role_id, permission) VALUES
  ('$OWNER_ID', 'admin:*')
ON CONFLICT DO NOTHING;
SQL

echo "🔄 Running Keto migration..."
docker compose up -d keto-migrate
docker compose wait keto-migrate

echo "🔄 Restarting services..."
docker compose up -d keto storm-id-ui

echo "✅ Done! All databases reset and roles seeded."
echo "   @owner UUID: $OWNER_ID"
echo "   @everyone UUID: $EVERYONE_ID"
echo "   Run 'bash scripts/make-admin.sh <email>' to assign admin."
