FROM node:18.16.1-alpine3.17 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER node
EXPOSE 8000

CMD npm run start:dev