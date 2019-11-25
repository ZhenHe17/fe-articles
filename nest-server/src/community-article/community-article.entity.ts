import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("community_articles")
export class CommunityArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 200 })
  href: string;

  @Column({ length: 100 })
  tag: string;

  @Column({ length: 20 })
  origin: string;

  @Column({ length: 20 })
  category: string;

  @Column({ length: 20 })
  type: string;

  @Column({ length: 200 })
  desc: string;

  @Column('timestamp')
  create_date: Date;

}
