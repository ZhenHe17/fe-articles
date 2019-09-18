FROM node:12.10.0-alpine as client

RUN mkdir /opt/webapp
WORKDIR /opt/webapp
COPY ./package.json .
RUN npm install --production --registry=https://registry.npm.taobao.org
COPY . .

# CMD npm run start
RUN npm run build

# Setup the server

FROM nginx

WORKDIR /usr/app/
COPY --from=client /opt/webapp/build/ /usr/share/nginx/html/