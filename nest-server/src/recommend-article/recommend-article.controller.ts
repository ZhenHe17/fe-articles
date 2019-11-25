import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ArticleService, NewestResult } from './recommend-article.service';
import { RecommendArticle } from './recommend-article.entity';
import { UpdateResult } from 'typeorm';

export interface FindNewestQuery {
  edition?: number
}

export interface ReviewBody {
  rows: number[],
  status: number
}

export interface SearchQuery {
  search: string,
}

@Controller('recommend-article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findNewest(@Query() query: FindNewestQuery): Promise<NewestResult> {
    if (query.edition && Number(query.edition) > 0) {
      const totalEdition = await this.articleService.getTotalEdition()
      const articleList = await this.articleService.findByEdition(query.edition)
      return {
        totalEdition,
        articleList
      }
    } else {
      return this.articleService.findNewest();
    }
  }

  @Get('search')
  searchArticle(@Query() query: SearchQuery): Promise<RecommendArticle[]> {
    return this.articleService.searchArticle(decodeURIComponent(query.search))
  }

  // 推荐新文章
  @Post('recommend')
  async recommend(@Body() insertArticle: RecommendArticle) {
    try {
      const { title, href, tag, desc, referrer } = insertArticle;
      const article: RecommendArticle = {
        id: null,
        title,
        href,
        tag,
        desc,
        referrer,
        origin: 'recommend',
        create_date: new Date(),
        review_status: 0,
        edition: -1,
        rank: -1,
      };
      return this.articleService.recommend(article)
    } catch (err) {
      console.log(err);
    }
  }

  @Get('get-review-article')
  getReviewArticle(): Promise<RecommendArticle[]> {
    return this.articleService.getReviewArticle();
  }

  @Post('update-status-article')
  updateStatus(@Body() data: ReviewBody): Promise<UpdateResult> {
    return this.articleService.updateStatus(data);
  }
}
