# FE Articles

## QuickStart

### Development

``` bash
docker-compose -f docker-compose-dev.yml up
```

nginx proxy:

webapp: http://localhost:3000/ => http://localhost:3030/

api: http://localhost:7001/ => http://localhost:3030/api/

### Deploy

``` bash
docker-compose up
```

webapp: http://localhost:3030/front-tech/

api: http://localhost:3030/api/

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
