FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1-alpine AS builder
ARG NEXT_PUBLIC_ORY_SDK_URL
ENV NEXT_PUBLIC_ORY_SDK_URL=$NEXT_PUBLIC_ORY_SDK_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN chown -R nextjs:nodejs /app
USER nextjs
ENV NODE_ENV=production PORT=3000 HOSTNAME="0.0.0.0"
EXPOSE 3000
CMD ["bun", "server.js"]
