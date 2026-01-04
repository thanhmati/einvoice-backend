#!/bin/bash
set -e

# Get affected projects (we need this to restart only affected services)
AFFECTED_APPS=$(npx nx show projects --affected --type app --json | jq -r 'join(" ")')

if [ -z "$AFFECTED_APPS" ]; then
  echo "No apps affected. Skipping deployment."
  exit 0
fi

echo "Deploying affected apps: $AFFECTED_APPS"

# Setup SSH key
mkdir -p ~/.ssh
echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan -H $SSH_HOST >> ~/.ssh/known_hosts

# Generate deployment command
# We iterate to construct the command or execute composed commands
# Simplifying: We will update the .env file on server with new tag (optional) or just pull and up.
# Since we pushed 'latest' and 'TAG', reliable deploy uses 'TAG' but for simple compose:
# We might need to pass the TAG to the server.

REMOTE_DIR="/opt/einvoice" # Example path

# Create directory if not exists
ssh $SSH_USER@$SSH_HOST "mkdir -p $REMOTE_DIR"

# Copy compose files and configuration
echo "Copying compose files and config to remote..."
scp -o StrictHostKeyChecking=no docker-compose.provider.yaml docker-compose.deploy.yml $SSH_USER@$SSH_HOST:$REMOTE_DIR/
# Copy the docker configuration folder (contains prometheus.yml, etc.)
scp -r -o StrictHostKeyChecking=no docker $SSH_USER@$SSH_HOST:$REMOTE_DIR/

# Update .env file if secret exists
if [ ! -z "$ENV_FILE" ]; then
  echo "Updating .env file on remote..."
  echo "$ENV_FILE" > .env.production
  scp -o StrictHostKeyChecking=no .env.production $SSH_USER@$SSH_HOST:$REMOTE_DIR/.env
  rm .env.production
fi

# Command to execute on remote server
# 1. Start/Ensure providers are up (idempotent)
# 2. Deploy affected apps
commands="
export DOCKER_REGISTRY=$DOCKER_REGISTRY;
export IMAGE_TAG=$IMAGE_TAG;
cd $REMOTE_DIR || exit 1;
echo 'Ensuring providers are up...';
docker compose -f docker-compose.provider.yaml up -d;
"

for APP in $AFFECTED_APPS; do
  commands+="
  echo 'Deploying $APP...';
  docker compose -f docker-compose.deploy.yml pull $APP;
  docker compose -f docker-compose.deploy.yml up -d --no-deps $APP;
  "
done

echo "Executing remote commands..."
ssh $SSH_USER@$SSH_HOST "$commands"

echo "Deployment completed."
