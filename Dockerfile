FROM node:22-alpine AS builder
ENV NODE_ENV=production

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install

COPY . .
RUN yarn build 

# --- Production Image ---
FROM node:22-alpine AS runner

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
CMD ["node", "--trace-uncaught", "build"]
