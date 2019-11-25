FROM node:10-alpine

RUN apk --update --no-cache add tzdata bash curl \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install global @nestjs/cli --registry=https://registry.npm.taobao.org
COPY ./package.json .
RUN npm install --production --registry=https://registry.npm.taobao.org
COPY . /usr/src/app
COPY wait-for-it.sh /
CMD /wait-for-it.sh db:3306 -- npm run start