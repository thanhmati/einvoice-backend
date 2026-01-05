FROM --platform=linux/amd64 docker.io/node:20-slim

WORKDIR /app

COPY dist/apps/pdf-generator ./

# Install pnpm for dependency installation
RUN npm install -g pnpm@10.19.0

# Install production dependencies
RUN if [ -f package.json ]; then pnpm install --prod --frozen-lockfile; fi
RUN pnpm install tslib
RUN apt-get update && apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
RUN pnpm exec puppeteer browsers install chrome

CMD ["node", "main.js"]
