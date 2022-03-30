FROM node:14-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install --registry=https://registry.npmmirror.com
CMD npm run start