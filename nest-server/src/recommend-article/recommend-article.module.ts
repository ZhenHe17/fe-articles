import { Module } from '@nestjs/common';
import { ArticleService } from './recommend-article.service';
import { ArticleController } from './recommend-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendArticle } from './recommend-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendArticle])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class RecommendArticleModule {}
