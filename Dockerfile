# Use a minimal Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json separately to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy entire project
COPY . .

# Set environment variables
ENV PORT=8000
EXPOSE $PORT

# Start the app
CMD ["node", "server.js"]
