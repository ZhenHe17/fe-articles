# FE Articles

## QuickStart

### Development

开发环境使用了文件映射，首次启动需要在本地安装好依赖
``` bash
cd nest-server
npm i
cd webapp
npm i
```

然后启动docker
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

获取推荐文章
http://localhost:3030/front-tech/api/recommend-article

爬取社区文章
http://localhost:3030/front-tech/api/community-article
