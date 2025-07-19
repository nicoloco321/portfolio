# Build stage for React frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for vite)
RUN npm install

# Copy backend source
COPY server ./server

# Copy built frontend from build stage
COPY --from=frontend-build /app/dist ./dist

# Copy environment file
COPY server/config.env ./server/config.env

# Expose the port the app runs on
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev", "--", "--host"]