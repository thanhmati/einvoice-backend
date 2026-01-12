FROM node:20-alpine

WORKDIR /app

COPY dist/apps/user-access ./

# Install pnpm for dependency installation
RUN npm install -g pnpm@10.19.0

# Install production dependencies
RUN if [ -f package.json ]; then pnpm install --prod --frozen-lockfile; fi
RUN pnpm install tslib

CMD ["node", "main.js"]
