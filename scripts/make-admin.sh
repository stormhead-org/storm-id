#!/bin/bash
set -euo pipefail

# Load .env if present
if [ -f .env ]; then
  set -a; source .env; set +a
fi

POSTGRES_USER="${POSTGRES_USER:-storm}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-storm}"
POSTGRES_HOST="${POSTGRES_HOST:-postgres}"
APP_URL="${PUBLIC_URL:-http://localhost:4455}"

if [ $# -ne 1 ]; then
  echo "Usage: $0 <email>"
  echo "Makes an existing Kratos identity an admin via Keto."
  echo "Example: $0 admin@stormhead.org"
  exit 1
fi

EMAIL="$1"

echo "🔍 Looking up identity by email: $EMAIL"

IDENTITY_ID=$(docker compose exec -T kratos wget -qO- http://localhost:4434/admin/identities | \
  python3 -c "
import sys,json
data=json.load(sys.stdin)
for i in data:
  if i.get('traits',{}).get('email')=='$EMAIL':
    print(i['id']); break
")

if [ -z "$IDENTITY_ID" ]; then
  echo "❌ Identity with email '$EMAIL' not found!"
  echo "   Make sure the user is registered first via ${APP_URL}/registration"
  exit 1
fi

echo "✓ Found identity: $IDENTITY_ID"

echo "🔍 Looking up @owner role UUID..."
OWNER_UUID=$(docker exec "$POSTGRES_HOST" psql -h localhost -U "$POSTGRES_USER" -d stormid -t -A \
  -c "SELECT id FROM roles WHERE name = '@owner' LIMIT 1;" 2>/dev/null || true)

if [ -z "$OWNER_UUID" ]; then
  echo "❌ @owner role not found in stormid database!"
  echo "   Make sure roles are seeded (run scripts/seed.sh)"
  exit 1
fi

echo "✓ Found @owner UUID: $OWNER_UUID"

echo "🔧 Assigning admin role..."
JSON=$(printf '{"namespace":"StormID","object":"%s","relation":"member","subject_id":"%s"}' "$OWNER_UUID" "$IDENTITY_ID")
docker compose exec -T storm-id-ui bun -e "
fetch('http://keto:4467/admin/relation-tuples',{
  method:'PUT',
  headers:{'Content-Type':'application/json'},
  body:'$JSON'
}).then(r=>{
  if(r.ok) console.log('✅ Admin role assigned');
  else { console.error('Failed:', r.status); process.exit(1); }
})
"

echo ""
echo "✅ Done! Identity '$EMAIL' is now an admin."
echo "   They will see 'Администрирование' in the navigation after next login."
