#!/bin/bash
set -e

echo "Fixing source-map-js by downloading pre-built version..."

# Remove broken source-map-js
rm -rf node_modules/source-map-js

# Install source-map (older, stable version without build issues)
npm install source-map@0.7.4 --no-save --legacy-peer-deps

# Create symlink so source-map-js points to source-map
ln -s source-map node_modules/source-map-js

echo "Building Next.js..."
next build
