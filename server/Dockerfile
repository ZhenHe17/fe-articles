FROM node:10-alpine

RUN apk --update --no-cache add tzdata bash curl \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/

RUN npm install --registry=https://registry.npmmirror.com

COPY . /usr/src/app
COPY wait-for-it.sh /

CMD /wait-for-it.sh db:3306 -- npm run start