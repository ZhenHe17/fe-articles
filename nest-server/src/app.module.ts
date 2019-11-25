import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RecommendArticle } from './recommend-article/recommend-article.entity';
import { CommunityArticleModule } from './community-article/community-article.module';
import { RecommendArticleModule } from './recommend-article/recommend-article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'wptroot',
      database: 'article',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CommunityArticleModule,
    RecommendArticleModule,
  ],
})
export class AppModule {}
