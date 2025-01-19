# Step 1: Use Node.js base image
FROM node:22.12.0 as build

# Step 2: Set the working directory to /app
WORKDIR /app

# Step 3: Define the environment variable for the Git commit (optional)
ARG GIT_COMMIT
ENV REACT_APP_GIT_COMMIT=$GIT_COMMIT

# Step 4: Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Step 5: Install dependencies using npm
RUN npm install

# Step 6: Copy the rest of the application files into the container
COPY . .

# Step 7: Build the React app
RUN npm run build

# Step 8: Use Nginx base image for serving the React app
FROM nginx:alpine

# Step 9: Copy the build folder from the previous step to Nginx's default folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 10: Expose port 80 for HTTP access
EXPOSE 80

# Step 11: Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
