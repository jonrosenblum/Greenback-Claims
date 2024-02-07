# Use the official Node.js image as the base image
FROM node:16.20.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install cors

# Install vim
RUN apt-get update && apt-get install -y vim

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your application will run
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
