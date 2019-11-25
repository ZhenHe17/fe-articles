import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("recommend_articles")
export class RecommendArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 200 })
  href: string;

  @Column({ length: 100 })
  tag: string;

  @Column({ length: 200 })
  desc: string;

  @Column({ length: 20 })
  origin: string;

  @Column('tinyint')
  review_status: number;

  @Column({ length: 20 })
  referrer: string

  @Column('int')
  edition: number;

  @Column('int')
  rank: number;

  @Column('timestamp')
  create_date: Date;

}
