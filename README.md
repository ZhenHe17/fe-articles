# FE Articles

## QuickStart

### Development

start mysql and nginx by docker

``` bash
docker-compose -f docker-compose-dev.yml up
```

start webapp and api

``` bash
cd server
npm i
npm run dev

# cd webapp
# npm i
# npm start
```

nginx proxy:

webapp: http://localhost:3000/ => http://localhost/

api: http://localhost:7001/ => http://localhost/api/



### Deploy

``` bash
docker-compose up
```

webapp: http://localhost/

api: http://localhost/api/

## API

获取最新一期奇舞周刊文章
/api/article/get-75team-list

获取掘金前端热门文章
/api/article/get-juejin-list

获取cnnode分享板块
/api/article/get-cnnode-list

获取oschina前端最新博客
/api/article/get-oschina-list

获取全部文章列表
/api/article/get-all-list
