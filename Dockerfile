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

# Expose port 3000 (serve's default port)
EXPOSE 3303

# Start serve
CMD ["serve", "-s", ".", "-l", "3303"]