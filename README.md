## fe-articles-backend

提供返回前端热门文章的接口

内部实现了：
* 中间件机制
* 路由机制
* 封装好的请求方法

### 启动服务器

``` bash
npm i
npm run start
```

### 启动数据库

数据库连接配置： ``` /src/connectMysql.ts ```
数据库初始化： ``` mysql>source <your path>src/init.sql ```;

### API

获取最新一期奇舞周刊文章
/article/get-75team-list

获取掘金前端热门文章
/article/get-juejin-list

获取cnnode分享板块
/article/get-cnnode-list

获取oschina前端最新博客
/article/get-oschina-list

获取全部文章列表
/article/get-all-list