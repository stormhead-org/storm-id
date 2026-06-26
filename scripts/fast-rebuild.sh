#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo ":: Building storm-id-ui locally..."
(cd storm-id-ui && bun run build)

echo ":: Rebuilding Docker image..."
docker compose build storm-id-ui

echo ":: Restarting container..."
docker compose up -d storm-id-ui

echo ":: Done"
