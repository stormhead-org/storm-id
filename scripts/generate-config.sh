#!/bin/bash
# Generate Ory configs from templates using PUBLIC_URL and other env vars
# Mode (dev/prod) is controlled by HYDRA_DEV_MODE in .env
set -euo pipefail

# ── Load .env if it exists ──────────────────
if [ -f .env ]; then
  set -a; source .env; set +a
fi

if [ "${HYDRA_DEV_MODE:-false}" = "true" ]; then
  MODE="dev"
else
  MODE="prod"
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# ── Build SMTP URI from parts (applies to both dev and prod) ──
if [ -n "${SMTP_HOST:-}" ]; then
  SMTP_PORT="${SMTP_PORT:-465}"
  if [ "${SMTP_PORT}" = "465" ]; then
    SMTP_PROTO="smtps"
  else
    SMTP_PROTO="smtp"
  fi

  if [ -n "${SMTP_USER:-}" ] && [ -n "${SMTP_PASSWORD:-}" ]; then
    SMTP_URI="${SMTP_PROTO}://${SMTP_USER}:${SMTP_PASSWORD}@${SMTP_HOST}:${SMTP_PORT}"
  else
    SMTP_URI="${SMTP_PROTO}://${SMTP_HOST}:${SMTP_PORT}"
  fi

  SMTP_URI="${SMTP_URI}?skip_ssl_verify=true"
fi

# ── Dev defaults ────────────────────────────
if [ "$MODE" = "dev" ]; then
  PUBLIC_URL="${PUBLIC_URL:-http://localhost:4455}"
  HYDRA_PKCE_ENFORCED="${HYDRA_PKCE_ENFORCED:-false}"
  HYDRA_PUBLIC_URL="http://localhost:4444"
  TLS_CIDR="127.0.0.1/32"
  COOKIE_DOMAIN="localhost"
  WEBAUTHN_RP_ID="localhost"
  KRATOS_COOKIE_NAME="${KRATOS_COOKIE_NAME:-ory_kratos_session}"
  SMTP_URI="${SMTP_URI:-smtp://localhost:1025?skip_ssl_verify=true}"
  SMTP_FROM="${SMTP_FROM:-noreply@stormhead.org}"
  SMTP_FROM_NAME="${SMTP_FROM_NAME:-STORM ID}"
else
  # ── Production: require PUBLIC_URL ────────
  if [ -z "${PUBLIC_URL:-}" ]; then
    echo "ERROR: PUBLIC_URL is not set in .env"
    echo "  Example: PUBLIC_URL=https://id.yourdomain.com"
    exit 1
  fi

  HYDRA_PKCE_ENFORCED="${HYDRA_PKCE_ENFORCED:-true}"
  HYDRA_PUBLIC_URL="${PUBLIC_URL}"
  TLS_CIDR="172.16.0.0/12"

  # Extract domain parts from PUBLIC_URL
  HOSTNAME="$(echo "$PUBLIC_URL" | sed -E 's|^https?://||;s|/.*||;s|:[0-9]+$||')"

  # Cookie domain: use the parent domain (e.g. id.yourdomain.com → yourdomain.com)
  # For single-level domains (e.g. yourdomain.com), use as-is
  COOKIE_DOMAIN="$HOSTNAME"
  if echo "$HOSTNAME" | grep -qE '^[^.]+[.][^.]+[.][^.]+'; then
    # Three or more parts: skip the first (subdomain)
    COOKIE_DOMAIN="$(echo "$HOSTNAME" | sed -E 's/^[^.]+\.//')"
  fi

  # WebAuthn RP ID: the hostname (without protocol/port)
  WEBAUTHN_RP_ID="$HOSTNAME"

  KRATOS_COOKIE_NAME="${KRATOS_COOKIE_NAME:-ory_kratos_session}"
  SMTP_URI="${SMTP_URI:-smtp://localhost:1025?skip_ssl_verify=true}"

  SMTP_FROM="${SMTP_FROM:-noreply@$(echo "$HOSTNAME" | sed 's/.*\.\(.*\..*\)/\1/;t;q')}"
  SMTP_FROM_NAME="${SMTP_FROM_NAME:-STORM ID}"
fi

# ── Generate configs ────────────────────────
echo ""
echo "⚙  Generating configs for: $MODE"
echo "   PUBLIC_URL:  $PUBLIC_URL"
echo "   Cookie domain: $COOKIE_DOMAIN"
echo "   WebAuthn RP:  $WEBAUTHN_RP_ID"
echo "   KRATOS base:  $PUBLIC_URL"
echo "   PKCE enforced: $HYDRA_PKCE_ENFORCED"
echo "   SMTP: ${SMTP_URI:0:50}..."
echo ""

replace_placeholders() {
  local input="$1"
  local output="$2"
  sed \
    -e "s|__PUBLIC_URL__|${PUBLIC_URL}|g" \
    -e "s|__HYDRA_PUBLIC_URL__|${HYDRA_PUBLIC_URL}|g" \
    -e "s|__HYDRA_PKCE_ENFORCED__|${HYDRA_PKCE_ENFORCED}|g" \
    -e "s|__TLS_CIDR__|${TLS_CIDR}|g" \
    -e "s|__COOKIE_DOMAIN__|${COOKIE_DOMAIN}|g" \
    -e "s|__WEBAUTHN_RP_ID__|${WEBAUTHN_RP_ID}|g" \
    -e "s|__KRATOS_COOKIE_NAME__|${KRATOS_COOKIE_NAME}|g" \
    -e "s|__SMTP_URI__|${SMTP_URI}|g" \
    -e "s|__SMTP_FROM__|${SMTP_FROM}|g" \
    -e "s|__SMTP_FROM_NAME__|${SMTP_FROM_NAME}|g" \
    "$input" > "$output"
}

mkdir -p "${PROJECT_DIR}/configs/hydra"
mkdir -p "${PROJECT_DIR}/configs/kratos"
mkdir -p "${PROJECT_DIR}/configs/keto"

replace_placeholders "${PROJECT_DIR}/configs/hydra/hydra.yaml.template" "${PROJECT_DIR}/configs/hydra/hydra.yaml"
echo "✓ configs/hydra/hydra.yaml"

replace_placeholders "${PROJECT_DIR}/configs/kratos/kratos.yaml.template" "${PROJECT_DIR}/configs/kratos/kratos.yaml"
echo "✓ configs/kratos/kratos.yaml"

replace_placeholders "${PROJECT_DIR}/configs/keto/keto.yaml.template" "${PROJECT_DIR}/configs/keto/keto.yaml"
echo "✓ configs/keto/keto.yaml"

echo ""
echo "✅ Config generation complete."
echo "   Run 'docker compose up -d' to start services."
