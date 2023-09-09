# building app
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .
COPY .env.prod .env

RUN npm run build

# serving app
FROM node:18-slim

WORKDIR /app
COPY --from=build /app/dist /app/dist

RUN npm install -g serve

CMD ["serve", "-s", "/app/dist", "-l", "8080"]
