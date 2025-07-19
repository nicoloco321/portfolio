FROM node:20-alpine

WORKDIR /app

# Copy package files from the root directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server source
COPY server ./server

# Expose the port the app runs on
EXPOSE 5050

# Command to run the application
CMD ["node", "--env-file=server/config.env", "server/server.js"] 