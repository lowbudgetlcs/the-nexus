FROM node:22-alpine AS builder 
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate && apk add --no-cache python3 make g++

WORKDIR /build
COPY pnpm-lock.yaml package.json ./
RUN pnpm install

COPY . .
RUN pnpm build

FROM node:22-alpine AS app
WORKDIR /app
COPY package.json ./
COPY --from=builder /build/build ./build
COPY --from=builder /build/node_modules ./node_modules

EXPOSE 3000

ENTRYPOINT ["node", "--trace-uncaught", "build"]
