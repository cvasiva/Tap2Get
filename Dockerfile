FROM node:20.11.1-alpine3.18 as builder
WORKDIR /app


RUN npm install -g npm@latest

COPY package.json ./
RUN npm install --force

COPY . .
RUN npm run build

FROM node:20.11.1-alpine3.18 as prod
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "run", "start"]

# FROM gcr.io/distroless/nodejs20-debian12
# WORKDIR /app
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

# EXPOSE 3000
# CMD ["npm", "run", "start"]
# CMD ["./node_modules/next/dist/server/next-server.js"]
