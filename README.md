# FE Articles

## QuickStart

### Development

``` bash
docker-compose -f docker-compose-dev.yml up
```

访问：http://localhost:3030/

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

获取推荐文章
http://localhost:3030/front-tech/api/recommend-article

爬取社区文章
http://localhost:3030/front-tech/api/community-article
