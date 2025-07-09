FROM --platform=linux/amd64 docker.io/node:jod-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack prepare pnpm@10.0.0 --activate
RUN corepack enable

WORKDIR /app

FROM base AS prod-deps
COPY /dist/apps/einvoice-backend /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod
RUN pnpm install tslib
EXPOSE 3000

CMD ["node", "main.js"]
