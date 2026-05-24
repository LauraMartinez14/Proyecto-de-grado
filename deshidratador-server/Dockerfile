FROM node:20-alpine3.19 AS builder
RUN apk add --no-cache tzdata
WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine3.19 AS runner
RUN apk add --no-cache tzdata
WORKDIR /app
ENV NODE_ENV=production

# Copy only what we need from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["npm", "start"]
