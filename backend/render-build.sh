#!/usr/bin/env bash
# Render build script

set -o errexit

# Install uv
pip install uv

# Install dependencies
uv pip install --system -r pyproject.toml

echo "Build completed successfully!"
