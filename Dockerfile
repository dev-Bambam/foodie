# Use a lightweight Node.js base image.
FROM node:18-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's build cache.
COPY package*.json ./

# Install dependencies. `npm ci` is used for consistent and fast production installs.
RUN npm ci

# Copy the rest of your application's source code into the container.
COPY . .

# Expose the port your Express app listens on (which should be process.env.PORT or 5000).
EXPOSE 5000

# Define the command to start your application.
# This should match your "start" script in package.json.
CMD ["npm", "run", "start"]