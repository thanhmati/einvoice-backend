#!/bin/bash
set -e

# Get affected projects
AFFECTED_APPS=$(npx nx show projects --affected --type app --json | jq -r 'join(" ")')

if [ -z "$AFFECTED_APPS" ]; then
  echo "No apps affected. Skipping Docker build."
  exit 0
fi

echo "Affected apps: $AFFECTED_APPS"

for APP in $AFFECTED_APPS; do
  echo "Building image for $APP..."
  
  # Check if Dockerfile exists
  if [ -f "apps/$APP/Dockerfile" ]; then
    DOCKERFILE="apps/$APP/Dockerfile"
    CONTEXT="."
  elif [ -f "docker/$APP/Dockerfile" ]; then
    DOCKERFILE="docker/$APP/Dockerfile"
    CONTEXT="."
  else
    echo "Warning: No Dockerfile found for $APP at apps/$APP/Dockerfile or docker/$APP/Dockerfile. Skipping."
    continue
  fi

  IMAGE_NAME="$DOCKER_REGISTRY/$APP"
  
  docker build -f $DOCKERFILE \
    -t $IMAGE_NAME:$IMAGE_TAG \
    -t $IMAGE_NAME:latest \
    $CONTEXT
  
  docker push $IMAGE_NAME:$IMAGE_TAG
  docker push $IMAGE_NAME:latest
done
