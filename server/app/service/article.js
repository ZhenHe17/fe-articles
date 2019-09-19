'use strict';
const Service = require('egg').Service;
const cheerio = require('cheerio');

const log = arg => {
  console.log('-!----------------!-');
  console.log(arg);
  console.log('-!----------------!-');
};

class ArticleService extends Service {
  async insert(article) {
    const result = await this.app.mysql.insert('get_article_time_tbl', article);
    return { result };
  }
  async find(id) {
    const result = await this.app.mysql.get('get_article_time_tbl', { id });
    return { result };
  }
  async get75teamList() {
    console.log('get75teamList service');
    const app = this.app;
    async function getCurrentArticles(path) {
      const data = await app.curl('https://weekly.75team.com/' + path, {});
      const $ = cheerio.load(data.res.data);
      const listItems = $('ul li');
      const articleList = [];
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems.eq(i);
        if (!item.children('h2').length) {
          const title = item.children('h3').text();
          const href = item.children('h3').find('a').attr('href');
          const desc = item.children('.desc').text();
          const tags = [];
          const tagNodes = item.children('.meta').children('.tag');
          for (let j = 0; j < tagNodes.length; j++) {
            const tag = tagNodes.eq(j).text();
            tags.push(tag);
          }
          articleList.push({
            title,
            desc,
            href,
            tags,
          });
        }
      }
      return articleList;
    }
    try {
      const data = await app.curl('https://weekly.75team.com/', {});
      const $ = cheerio.load(data.res.data);
      const links = $('ol.issue-list').find('li a');
      const path = links.eq(0).attr('href');
      return await getCurrentArticles(path);
    } catch (err) {
      log(err);
    }
  }
  async getJuejinList() {
    console.log('getJuejinList service');
    const option = {
      method: 'POST',
      data: {
        operationName: '',
        query: '',
        variables: { category: '5562b415e4b00c57d9b94ac8', first: 20, after: '', order: 'POPULAR' },
        extensions: { query: { id: '653b587c5c7c8a00ddf67fc66f989d42' } },
      },
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'X-Agent': 'Juejin/Web',
      },
    };
    try {
      const data = await this.app.curl('https://web-api.juejin.im/query', option);
      let list = data.res.data.data.articleFeed.items.edges;
      list = list.map(item => {
        item.node.href = item.node.originalUrl;
        return item.node;
      });
      return list;
    } catch (err) {
      log(err);
    }
  }
  async getCnodeList() {
    console.log('getCnodeList service');
    try {
      const data = await this.app.curl('https://cnodejs.org/?tab=share&page=1', { timeout: 30000 });
      const $ = cheerio.load(data.res.data);
      const listItems = $('.topic_title');
      const articleList = [];
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems.eq(i);
        const title = item.attr('title');
        const href = 'https://cnodejs.org' + item.attr('href');
        articleList.push({
          title,
          href,
        });
      }
      return articleList;
    } catch (err) {
      log(err);
    }
  }
  async getOschinaList() {
    console.log('getOschinaList service');
    try {
      const data = await this.app.curl('https://www.oschina.net/blog?classification=428612', { timeout: 30000 });
      const $ = cheerio.load(data.res.data);
      const listItems = $('#newestArticleList .blog-item .header');
      const articleList = [];
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems.eq(i);
        const title = item.attr('title');
        const href = item.attr('href');
        articleList.push({
          title,
          href,
        });
      }
      return articleList;
    } catch (err) {
      log(err);
    }
  }
  async queryTodayArticles(table) {
    try {
      const now = new Date();
      const result = await this.app.mysql.select(table, {
        where: { create_date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}` },
        orders: 'id',
      });
      return result;
    } catch (err) {
      log(err);
    }
  }
  async insertArticles(table, data) {
    try {
      const result = await this.app.mysql.insert(table, data);
      return result;
    } catch (err) {
      log(err);
    }
  }
}

module.exports = ArticleService;
