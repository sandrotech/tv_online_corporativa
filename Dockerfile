FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* bun.lockb* ./
RUN npm ci --no-audit --no-fund || npm install
COPY . .
ENV NODE_ENV=production
ENV PORT=3000
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]
