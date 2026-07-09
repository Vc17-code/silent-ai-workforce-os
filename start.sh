#!/usr/bin/env bash
# Start local preview server for the website
PORT="${1:-8080}"
echo ""
echo "  Apex Plumbing Website — Local Preview"
echo "  ======================================"
echo "  Starting server on port $PORT..."
echo ""
echo "  Open in browser: http://localhost:$PORT"
echo "  Press Ctrl+C to stop"
echo ""
cd "$(dirname "$0")"
python3 -m http.server "$PORT" --bind 0.0.0.0
