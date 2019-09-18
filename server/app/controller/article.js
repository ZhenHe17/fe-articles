'use strict';

const Controller = require('egg').Controller;

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
}

module.exports = ArticleController;
