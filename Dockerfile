# === Stage 1: Build the app ===
FROM node:22 AS builder

# Install git for private dependencies
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source files
COPY . .

# Build the app (generates dist folder)
RUN pnpm run build

# === Stage 2: Production image ===
FROM node:22-slim

WORKDIR /app

# Install pnpm and serve globally
RUN npm install -g pnpm serve

# Set production environment
ENV NODE_ENV=production

# Copy built output and minimal files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Expose the port your app will run on
EXPOSE 3109

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "3109"]
