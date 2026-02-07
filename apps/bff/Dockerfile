FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml nx.json .npmrc ./
RUN npm install -g pnpm@10.19.0
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm nx run bff:build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.19.0

COPY --from=builder /app/dist/apps/bff ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

CMD ["node", "main.js"]
