import React from 'react';
import './index.scss';

interface ArticleItemProps {
  item: Item
}

export interface Item {
  title: string,
  href: string,
  id: number,
}

export const ArticleItem: React.FC<ArticleItemProps> = ({ item }) => {
  return (
    <div className="article-item">
      <a href={item.href} rel="noopener noreferrer" target='_blank'>{item.title}</a>
    </div>
  );
}