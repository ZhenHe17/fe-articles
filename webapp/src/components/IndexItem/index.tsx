import React from 'react';
import './index.scss';

interface IndexItemProps {
  item: Item,
  className?: string,
}

export interface Item {
  title: string,
  href: string,
  id: number,
}

export const IndexItem: React.FC<IndexItemProps> = ({ item, className }) => {
  return (
    <div className={"index-item " + className} title={item.title}>
      <div className="bg">
        <a href={item.href} rel="noopener noreferrer" target='_blank'>{item.title}</a>
      </div>
    </div>
  );
}