FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG SERVERNAME
RUN npm run build:${SERVERNAME}

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
