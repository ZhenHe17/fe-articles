import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { CommunityArticle } from './community-article.entity';

const cheerio = require('cheerio');
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(CommunityArticle)
    private readonly articleRepository: Repository<CommunityArticle>,
    private readonly httpService: HttpService,
  ) {}

  async findTodayArticles(): Promise<CommunityArticle[]> {
    const now = new Date();
    return await this.articleRepository.find({
      create_date: MoreThan(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
    });
  }

  async saveArticle(originArticles): Promise<boolean> {
    let articles = []
    for (const key in originArticles) {
      articles = articles.concat(originArticles[key])
    }
    articles = articles.map(item => {
      return {
        title: item.title,
        href: item.href,
        create_date: new Date(),
        origin: item.origin,
        tag: item.tag || '',
        category: item.category || '',
        type: '',
        desc: item.desc || '',
      };
    });
    this.articleRepository.save(articles);
    return true
  }

  async get75teamList() {
    console.log('get75teamList service');
    const httpService = this.httpService;
    async function getCurrentArticles(path) {
      const res = await httpService.get('https://weekly.75team.com/' + path).toPromise();
      const $ = cheerio.load(res.data);
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
      const res = await httpService.get('https://weekly.75team.com/').toPromise();
      const $ = cheerio.load(res.data);
      const links = $('ol.issue-list').find('li a');
      const path = links.eq(0).attr('href');
      return await getCurrentArticles(path);
    } catch (err) {
      console.error(err);
    }
  }

  async getJuejinArticles(order = 'popular'): Promise<CommunityArticle[]> {
    console.log('getJuejinList service');
    let data;
    if (order === 'weekly') {
      data = {
        operationName: '',
        query: '',
        variables: { category: '5562b415e4b00c57d9b94ac8', first: 20, after: '', order: 'WEEKLY_HOTTEST', tags: [] },
        extensions: { query: { id: '653b587c5c7c8a00ddf67fc66f989d42' } },
      };
    } else if (order === 'popular') {
      data = {
        operationName: '',
        query: '',
        variables: { category: '5562b415e4b00c57d9b94ac8', first: 20, after: '', order: 'POPULAR' },
        extensions: { query: { id: '653b587c5c7c8a00ddf67fc66f989d42' } },
      };
    } else if (order === 'newest') {
      data = {
        operationName: '',
        query: '',
        variables: { category: '5562b415e4b00c57d9b94ac8', first: 20, after: '', order: 'NEWEST' },
        extensions: { query: { id: '653b587c5c7c8a00ddf67fc66f989d42' } },
      };
    }
    const option = {
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'X-Agent': 'Juejin/Web',
      },
    };
    try {
      const res = await this.httpService.post('https://web-api.juejin.im/query', data, option).toPromise();
      let list = res.data.data.articleFeed.items.edges;
      list = list.map(item => {
        item.node.href = item.node.originalUrl;
        return item.node;
      });
      return list;

    } catch (err) {
      console.error(err);
    }
  }

  async getJianshuList() {
    console.log('getJianshuList service');
    try {
      const res = await this.httpService.get('https://www.jianshu.com/c/f489ec955505').toPromise();
      const $ = cheerio.load(res.data);
      const listItems = $('.note-list li .content');
      const articleList = [];
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems.eq(i).children('.title');
        const title = item.text();
        const href = 'https://www.jianshu.com' + item.attr('href');
        articleList.push({
          title,
          href,
        });
      }
      return articleList;
    } catch (err) {
      console.error(err);
    }
  }
}
