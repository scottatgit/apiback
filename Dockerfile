# Use the official Node.js image.
FROM node:18

# Create and set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies.
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files.
COPY . .

# Build the NestJS application.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 5000

# Start the application.
CMD ["npm", "run", "start:prod"]
