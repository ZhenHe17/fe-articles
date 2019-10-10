'use strict';

const Controller = require('egg').Controller;

const log = arg => {
  console.log('-!----------------!-');
  console.log(arg);
  console.log('-!----------------!-');
};
class ArticleController extends Controller {
  async delCache() {
    this.app.redis.del('indexResult');
    this.ctx.body = {
      code: 0,
      msg: 'Delete cache success',
    };
  }
  async info() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const article = await ctx.service.article.find(id);
    // get
    ctx.body = article;
    ctx.body.foo = await this.app.redis.get('foo');
  }
  async insert() {
    const ctx = this.ctx;
    try {
      const { title, href, tag, desc } = ctx.request.body;
      const article = {
        title,
        href,
        tag,
        desc,
        origin: 'recommend',
        create_date: new Date(),
      };
      await this.ctx.service.article.insertArticles('weekly_articles', article);
      ctx.body = {
        code: 0,
        msg: 'OK',
      };
    } catch (err) {
      console.log(err);
    }
  }
  async getIndex() {
    const cache = await this.app.redis.get('indexResult');
    if (cache) {
      this.ctx.body = JSON.parse(cache);
      return false;
    }
    const [ juejinArticle, jianshuArticle, recommendArticle ] = await Promise.all([ this.ctx.service.article.getJuejinList('newest'), this.ctx.service.article.getJianshuList(), this.ctx.service.article.queryWeeklyArticles() ]);
    let newestList = juejinArticle.filter(item => {
      const time = new Date(item.createdAt).getTime();
      return this.ctx.now - 86400000 < time;
    }).sort((a, b) => {
      return b.hotIndex - a.hotIndex;
    }).slice(0, 5);
    newestList = newestList.concat(jianshuArticle.slice(0, 3));
    const [ juejinWeeklyArticle, teamArticle ] = await Promise.all([ this.ctx.service.article.getJuejinList('newest'), this.ctx.service.article.get75teamList() ]);
    const result = { newestList, juejinWeeklyArticle: juejinWeeklyArticle.slice(0, 8), teamArticle, recommendArticle };
    this.app.redis.set('indexResult', JSON.stringify(result), 'EX', 3600);
    this.ctx.body = result;
  }
  async getAllList() {
    const needQueryTableName = [];
    const needQuery = [];
    this.ctx.body = {};
    const allTableMap = [
      {
        name: '75team',
        service: this.ctx.service.article.get75teamList.bind(this),
      },
      {
        name: 'juejin',
        service: this.ctx.service.article.getJuejinList.bind(this),
      },
      {
        name: 'cnnode',
        service: this.ctx.service.article.getCnodeList.bind(this),
      },
      {
        name: 'oschina',
        service: this.ctx.service.article.getOschinaList.bind(this),
      },
      {
        name: 'jianshu',
        service: this.ctx.service.article.getJianshuList.bind(this),
      },
    ];
    console.log('controller----------------!!!getAllList!!!---------------------');
    try {
      // 查询数据库是否有当天已爬取的记录
      const res = await this.ctx.service.article.queryTodayArticles();
      for (let i = 0; i < allTableMap.length; i++) {
        const articleName = allTableMap[i].name;
        const result = res.filter(item => item.origin === articleName);
        if (result && result.length) {
          console.log('----------------!!!查到!!!---------------------', articleName);
          this.ctx.body[articleName] = result;
        } else {
          needQueryTableName.push(articleName);
          needQuery.push(allTableMap[i].service);
        }
      }
    } catch (err) {
      log(err);
    }
    try {
      // 没有记录的重新爬取
      if (needQuery.length) {
        await Promise.all(needQuery.map(query => query())).then(res => {
          for (let i = 0; i < needQueryTableName.length; i++) {
            const name = needQueryTableName[i];
            console.log(`----------------!!!重新查询${name}!!!---------------------`);
            this.ctx.body[name] = res[i];
            if (res[i] && Array.isArray(res[i])) {
              const articleList = res[i].map(item => {
                return {
                  title: item.title,
                  href: item.href,
                  create_date: new Date(),
                  origin: name,
                };
              });
              this.ctx.service.article.insertArticles('all_articles', articleList);
            }
          }
        });
      }
    } catch (err) {
      log(err);
    }
    return this.ctx.body;
  }
  async getTodayList() {
    const juejinArticle = await this.ctx.service.article.getJuejinList();
    const result = juejinArticle.filter(item => {
      const time = new Date(item.createdAt).getTime();
      return this.ctx.now - 86400000 < time;
    }).sort((a, b) => {
      return b.hotIndex - a.hotIndex;
    });
    this.ctx.body = { juejinArticle, result };
  }
  async get75teamList() {
    const article = await this.ctx.service.article.get75teamList();
    this.ctx.body = article;
  }
  async getJianshuList() {
    const article = await this.ctx.service.article.getJianshuList();
    this.ctx.body = article;
  }
  async getJuejinList() {
    const article = await this.ctx.service.article.getJuejinList();
    this.ctx.body = article;
  }
  async getCnodeList() {
    const article = await this.ctx.service.article.getCnodeList();
    this.ctx.body = article;
  }
  async getOschinaList() {
    const article = await this.ctx.service.article.getOschinaList();
    this.ctx.body = article;
  }
}

module.exports = ArticleController;
