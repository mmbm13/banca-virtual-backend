FROM node:18-alpine AS builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM node:18-alpine AS server
ARG NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit-dev
COPY --from=builder ./app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main.js"]

FROM node:18-alpine as development
ARG NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . ./
EXPOSE 3001
CMD [ "npm", "start" ]