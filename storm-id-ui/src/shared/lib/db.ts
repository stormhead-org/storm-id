import { randomUUID } from "node:crypto";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

export { pool };

let schemaInitialized = false;

export async function query(text: string, params?: unknown[]) {
  if (!schemaInitialized) {
    await ensureSchema();
  }
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function ensureSchema() {
  await queryRaw(`
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
    )
  `);

  await queryRaw(`
    CREATE TABLE IF NOT EXISTS role_permissions (
      role_id VARCHAR(64) REFERENCES roles(id) ON DELETE CASCADE,
      permission VARCHAR(255) NOT NULL,
      PRIMARY KEY (role_id, permission)
    )
  `);

  await queryRaw(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS position INTEGER NOT NULL DEFAULT 0`);
  await queryRaw(`ALTER TABLE roles ADD COLUMN IF NOT EXISTS color VARCHAR(7) DEFAULT '#99AAB5'`);

  const existing = await queryRaw(`SELECT COUNT(*) as count FROM roles`);
  if (parseInt(existing.rows[0].count, 10) === 0) {
    const ownerId = randomUUID();
    const everyoneId = randomUUID();

    await queryRaw(
      `INSERT INTO roles (id, name, description, is_system, is_default, position, color) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING`,
      [ownerId, "@owner", "System owner — full access", true, false, 10000, "#F1C40F"],
    );
    await queryRaw(
      `INSERT INTO roles (id, name, description, is_system, is_default, position, color) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING`,
      [everyoneId, "@everyone", "Default role for all users", true, true, 0, "#99AAB5"],
    );
    await queryRaw(
      `INSERT INTO role_permissions (role_id, permission) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [ownerId, "admin:*"],
    );
  }
  schemaInitialized = true;
}

async function queryRaw(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}
