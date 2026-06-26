const LOG_PREFIX = "[storm-id]";

function sanitize(obj: unknown): unknown {
  if (typeof obj === "string") return obj.slice(0, 2000);
  if (obj instanceof Error) return { name: obj.name, message: obj.message.slice(0, 1000) };
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (
        k.toLowerCase().includes("secret") ||
        k.toLowerCase().includes("password") ||
        k === "csrf_token"
      )
        continue;
      out[k] = sanitize(v);
    }
    return out;
  }
  return obj;
}

export function log(tag: string, data?: Record<string, unknown>) {
  const sanitized = data ? (sanitize(data) as Record<string, unknown>) : {};
  const entry = { tag, ...sanitized };
  console.log(LOG_PREFIX, JSON.stringify(entry));
}
