##############################
# BUILD STAGE
##############################
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

##############################
# RUNTIME STAGE
##############################
FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app .

EXPOSE ${PORT}

# Next.js rodando na porta dinâmica do CapRover
CMD ["sh", "-c", "npm start -- -p ${PORT}"]
