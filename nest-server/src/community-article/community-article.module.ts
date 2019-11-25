import { Module, HttpModule } from '@nestjs/common';
import { ArticleService } from './community-article.service';
import { ArticleController } from './community-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityArticle } from './community-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityArticle]), HttpModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class CommunityArticleModule {}
