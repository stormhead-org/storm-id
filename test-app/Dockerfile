FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev

FROM node:20-alpine
RUN apk --no-cache add ca-certificates tzdata && \
    adduser -D -u 1001 -h /home/appuser appuser
COPY --from=builder /app/node_modules /app/node_modules
COPY server.js /app/
COPY public/ /app/public/
USER appuser
WORKDIR /app
EXPOSE 5173
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1
CMD ["node", "/app/server.js"]
