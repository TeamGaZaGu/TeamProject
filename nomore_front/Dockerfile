FROM node:20 AS build
WORKDIR /app
COPY . .
ARG SERVERNAME
RUN npm install
RUN npm run build:${SERVERNAME}

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html