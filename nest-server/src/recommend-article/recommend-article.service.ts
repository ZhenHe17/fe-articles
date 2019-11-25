import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, Like } from 'typeorm';
import { RecommendArticle } from './recommend-article.entity';
import { ReviewBody } from './recommend-article.controller';
import { throwError } from 'rxjs';

export interface NewestResult{
  totalEdition: number,
  articleList: RecommendArticle[]
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(RecommendArticle)
    private readonly articleRepository: Repository<RecommendArticle>,
  ) {}

  // 查询最新一期推荐文章
  async findNewest(): Promise<NewestResult> {
    const totalEdition = await this.getTotalEdition()
    const articleList = await this.findByEdition(totalEdition)
    if (totalEdition) {
      return {
        totalEdition,
        articleList
      }
    } else {
      throwError('No article')
    }
  }

  // 获取总期数
  async getTotalEdition(): Promise<number> {
    const result = await this.articleRepository.find({
      order: {
        edition: "DESC"
      },
      take: 1
    })
    return result[0] ? result[0].edition : 0
  }

  // 查询某一期推荐文章
  findByEdition(edition: number): Promise<RecommendArticle[]> {
    return this.articleRepository.find({
      where: {
        edition
      },
      order: {
        rank: "DESC"
      }
    });
  }

  // 查询待审核文章
  async getReviewArticle(): Promise<RecommendArticle[]> {
    return this.articleRepository.find({
      where: {
        review_status: 0
      },
      order: {
        id: "DESC"
      }
    });
  }

  // 搜索文章
  async searchArticle(searchString: string): Promise<RecommendArticle[]> {
    const search1 = this.articleRepository.query(`SELECT * FROM recommend_articles WHERE title LIKE '%${searchString}%' or tag LIKE '%${searchString}%' or \`desc\` LIKE '%${searchString}%'`)
    const search2 = this.articleRepository.query(`SELECT * FROM community_articles WHERE title LIKE '%${searchString}%' or tag LIKE '%${searchString}%' or \`desc\` LIKE '%${searchString}%'`)
    const [res1, res2] = await Promise.all([search1, search2])
    const originArr = res1.concat(res2)
    const map = new Map()
    const result = []
    // 去重
    for (const item of originArr) {
      map.set(item.href, item)
    }
    for (const [key, value] of map) {
      result.push(value)
    }
    //时间倒序
    return result.sort((a:RecommendArticle, b:RecommendArticle) => {
      return new Date(b.create_date).getTime() - new Date(a.create_date).getTime()
    })
  }

  // 审核文章
  async updateStatus(data: ReviewBody): Promise<UpdateResult> {
    const totalEdition = await this.getTotalEdition()
    return this.articleRepository.update(data.rows, { review_status: data.status, edition: totalEdition + 1});
  }

  // 插入推荐文章
  async recommend(article: RecommendArticle): Promise<any> {
    return this.articleRepository.insert(article);
  }
}
