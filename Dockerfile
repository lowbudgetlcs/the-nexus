# Use an official Node.js runtime as the base image
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Install dependencies separately to leverage Docker caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app's source code
COPY . .

# Build the SvelteKit app
RUN npm run build
RUN npm prune --production

# --- Production Image ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Set the user to a non-root user for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port that the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build"]

