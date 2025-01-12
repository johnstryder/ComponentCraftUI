# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Serve stage
FROM node:20-alpine

# Install serve
RUN npm install -g serve

WORKDIR /app

# Copy built assets from build stage
COPY --from=build /app/dist .

# Default to port 5173 to match docker-compose, but allow override
ENV PORT=5173

# Expose the port
EXPOSE ${PORT}

# Start serve using the PORT environment variable
CMD ["sh", "-c", "serve -s . -l ${PORT}"]