FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* bun.lockb* ./
RUN npm ci --no-audit --no-fund || npm install

COPY . .

ENV NODE_ENV=production
# Porta padrão, mas pode ser sobrescrita em runtime
ENV PORT=3000

RUN npm run build

# Expondo apenas a variável, não um número fixo
EXPOSE ${PORT}

CMD ["npm","run","start"]
