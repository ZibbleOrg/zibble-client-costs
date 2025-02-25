#!/bin/bash

echo "$TESTING_ENV"
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:?API token not set}"
CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:?Account ID not set}"
CLOUDFLARE_KV_NAMESPACE_ID="${CLOUDFLARE_KV_NAMESPACE_ID:?Namespace ID not set}"
CLOUDFLARE_KV_KEY="${CLOUDFLARE_KV_KEY:-CONFIG_JSON}"
OUTPUT_FILE="config.json"

CLOUDFLARE_API_URL="https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/storage/kv/namespaces/$CLOUDFLARE_KV_NAMESPACE_ID/values/$CLOUDFLARE_KV_KEY"

curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -H "Content-Type: application/json" \
     "$CLOUDFLARE_API_URL" -o "$OUTPUT_FILE"

if [ -s "$OUTPUT_FILE" ]; then
  echo "✅ Config file saved successfully to $OUTPUT_FILE"
else
  echo "❌ Failed to fetch config.json"
  exit 1
fi
