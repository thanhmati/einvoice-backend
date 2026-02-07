#!/bin/bash
set -e

# Default to all apps if no arguments provided
APPS=${@:-"bff authorizer invoice mail media pdf-generator product user-access"}

echo "Preparing to run local verify for apps: $APPS"

# 2. Build Docker images
for APP in $APPS; do
  echo "Building Docker image for $APP..."
  
  if [ -f "apps/$APP/Dockerfile" ]; then
    DOCKERFILE="apps/$APP/Dockerfile"
    CONTEXT="."
  elif [ -f "docker/$APP/Dockerfile" ]; then
    DOCKERFILE="docker/$APP/Dockerfile"
    CONTEXT="."
  else
    echo "Warning: No Dockerfile found for $APP. Skipping."
    continue
  fi

  docker build -f $DOCKERFILE -t $APP:local $CONTEXT
done

# 3. Run with docker-compose
echo "Starting containers..."
docker compose -f docker-compose.local.yaml up -d --remove-orphans

echo "Local environment started."
