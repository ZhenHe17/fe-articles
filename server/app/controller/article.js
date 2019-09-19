'use strict';

const Controller = require('egg').Controller;

const log = arg => {
  console.log('-!----------------!-');
  console.log(arg);
  console.log('-!----------------!-');
};
class ArticleController extends Controller {
  async info() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const article = await ctx.service.article.find(id);
    ctx.body = article;
  }
  async insert() {
    const ctx = this.ctx;
    const website_name = ctx.query.name;
    const query_date = new Date();
    try {
      const article = await ctx.service.article.insert({ website_name, query_date });
      ctx.body = article;
    } catch (err) {
      console.log(err);
    }
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
    ];
    console.log('controller----------------!!!getAllList!!!---------------------');
    try {
      // 查询数据库是否有当天已爬取的记录
      await Promise.all(allTableMap.map(item => this.ctx.service.article.queryTodayArticles(`${item.name}_article_tbl`))).then(res => {
        for (let i = 0; i < res.length; i++) {
          const result = res[i];
          if (result && result.length) {
            this.ctx.body[allTableMap[i].name] = result;
          } else {
            needQueryTableName.push(allTableMap[i].name);
            needQuery.push(allTableMap[i].service);
          }
        }
        return this.ctx.body;
      });
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
              const list = res[i].map(item => {
                return {
                  title: item.title,
                  href: item.href,
                  create_date: new Date(),
                };
              });
              this.ctx.service.article.insertArticles(name + '_article_tbl', list);
            }
          }
        });
      }
    } catch (err) {
      log(err);
    }
    return this.ctx.body;
  }
  async get75teamList() {
    const article = await this.ctx.service.article.get75teamList();
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
