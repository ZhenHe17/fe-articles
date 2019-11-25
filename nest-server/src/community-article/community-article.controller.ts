import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './community-article.service';
import { CommunityArticle } from './community-article.entity';

@Controller('community-article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findTodayArticles(): Promise<any> {
    const articleService = this.articleService;
    const now = new Date().getTime()
    const todayArticles = await articleService.findTodayArticles()
    let result
    if (todayArticles.length) {
      const newestList = todayArticles.filter(article => article.origin === 'juejin')
      const juejinWeeklyArticle = todayArticles.filter(article => article.origin === 'newest')
      const teamArticle = todayArticles.filter(article => article.origin === '75team')
      if (newestList.length && juejinWeeklyArticle.length && teamArticle.length) {
        result = { newestList, juejinWeeklyArticle, teamArticle };
        console.log('--------------cache---------------')
        return result
      }
    }
    let [ juejinArticle, jianshuArticle, juejinWeeklyArticle, teamArticle ] = await Promise.all([
      articleService.getJuejinArticles('newest'),
      articleService.getJianshuList(),
      articleService.getJuejinArticles('weekly'),
      articleService.get75teamList(),
    ]);
    let newestList = juejinArticle.filter((item: any) => {
      const time = new Date(item.createdAt).getTime();
      return now - 86400000 < time;
    }).sort((a: any, b: any) => {
      return b.hotIndex - a.hotIndex;
    }).slice(0, 5);
    newestList = newestList.concat(jianshuArticle.slice(0, 3));
    juejinWeeklyArticle = juejinWeeklyArticle.slice(0, 8)
    newestList = newestList.map(article => {
      article.origin = 'newest'
      return article
    })
    juejinWeeklyArticle = juejinWeeklyArticle.map(article => {
      article.origin = 'juejin'
      return article
    })
    teamArticle = teamArticle.map(article => {
      article.origin = '75team'
      return article
    })
    result = { newestList, juejinWeeklyArticle, teamArticle };
    articleService.saveArticle(result)
    return result
  }

  @Get('75team')
  async get75teamList(): Promise<CommunityArticle[]> {
    const articles = await this.articleService.get75teamList();
    return articles
  }

  @Get('juejin')
  async getJuejinArticles(): Promise<CommunityArticle[]> {
    const articles = await this.articleService.getJuejinArticles('weekly');
    return articles
  }

  @Get('jianshu')
  async getJianshuList(): Promise<CommunityArticle[]> {
    const articles = await this.articleService.getJianshuList();
    return articles
  }

}
