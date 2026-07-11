#!/bin/bash
set -e

echo "Fixing source-map-js..."

# Check if lib directory exists
if [ ! -d "node_modules/source-map-js/lib" ]; then
  echo "Creating lib directory and copying files..."
  mkdir -p node_modules/source-map-js/lib

  # Copy all .js files to lib as fallback
  cp node_modules/source-map-js/*.js node_modules/source-map-js/lib/ 2>/dev/null || true
fi

# Try to build
cd node_modules/source-map-js
npm run build 2>/dev/null || npm run build-es5 2>/dev/null || echo "Using copied files"
cd ../..

echo "Building Next.js..."
next build
