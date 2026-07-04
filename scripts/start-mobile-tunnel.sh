#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-5173}"
CF="${CLOUDFLARED:-/tmp/cloudflared}"

if ! command -v cloudflared >/dev/null 2>&1; then
  if [ ! -x "$CF" ]; then
    echo "Downloading cloudflared..."
    curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o "$CF"
    chmod +x "$CF"
  fi
  CF="$CF"
else
  CF="cloudflared"
fi

echo "Starting public tunnel to http://localhost:${PORT}"
echo "Open the https://*.trycloudflare.com URL on your phone."
exec "$CF" tunnel --url "http://localhost:${PORT}"
