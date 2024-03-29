FROM node:18.16.1-alpine3.17 AS base

RUN apk add --no-cache \
  tini \
  udev \
  chromium \
  freetype \
  harfbuzz \
  ttf-freefont

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER node
EXPOSE 8000

CMD npm run start:dev