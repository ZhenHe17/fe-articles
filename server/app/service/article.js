'use strict';
const Service = require('egg').Service;

class ArticleService extends Service {
  async insert(article) {
    const result = await this.app.mysql.insert('get_article_time_tbl', article);
    return { result };
  }
  async find(id) {
    const result = await this.app.mysql.get('get_article_time_tbl', { id });
    return { result };
  }
}

module.exports = ArticleService;
