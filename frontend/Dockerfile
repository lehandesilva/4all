FROM node:20-alpine3.20 as builder

WORKDIR /app

# Copy only package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]