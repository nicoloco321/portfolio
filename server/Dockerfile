FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server source
COPY . .

# Expose the port the app runs on
EXPOSE 5050

# Command to run the application
CMD ["node", "--env-file=config.env", "server.js"] 