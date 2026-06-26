#!/bin/sh
# Seed databases, tables, and default roles into stormid database
set -eu

if [ -f .env ]; then
  . ./.env
fi

POSTGRES_USER="${POSTGRES_USER:-storm}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-storm}"
POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"

export PGPASSWORD="${PGPASSWORD:-$POSTGRES_PASSWORD}"

echo "🌱 Creating databases..."

for db in kratos hydra keto stormid; do
  psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres -tc \
    "SELECT 1 FROM pg_database WHERE datname = '$db'" | grep -q 1 \
    && echo "  '$db' already exists" \
    || (psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE $db" && echo "  '$db' created")
done

echo "🌱 Seeding roles..."

psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d stormid <<'EOSQL'
CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  is_system BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  position INTEGER NOT NULL DEFAULT 0,
  color VARCHAR(7) DEFAULT '#99AAB5',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id VARCHAR(64) REFERENCES roles(id) ON DELETE CASCADE,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (role_id, permission)
);

INSERT INTO roles (id, name, description, is_system, is_default, position, color)
SELECT gen_random_uuid()::text, '@owner', 'System owner — full access', true, false, 10000, '#F1C40F'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = '@owner');

INSERT INTO roles (id, name, description, is_system, is_default, position, color)
SELECT gen_random_uuid()::text, '@everyone', 'Default role for all users', true, true, 0, '#99AAB5'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = '@everyone');

INSERT INTO role_permissions (role_id, permission)
SELECT id, 'admin:*' FROM roles WHERE name = '@owner'
  AND NOT EXISTS (SELECT 1 FROM role_permissions WHERE role_id = (SELECT id FROM roles WHERE name = '@owner') AND permission = 'admin:*');
EOSQL

echo "✅ Done"
