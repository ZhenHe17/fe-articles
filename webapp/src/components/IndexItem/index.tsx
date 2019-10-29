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
  tag?: string,
  desc?: string,
}

export const IndexItem: React.FC<IndexItemProps> = ({ item, className }) => {
  const tagArr = item.tag ? item.tag.split(',') : [];
  return (
    <div className={"index-item " + className} title={item.title}>
      <div className="bg">
        <a href={item.href} rel="noopener noreferrer" target='_blank'>{item.title}</a>
        <br />
        <span className="desc">{item.desc}</span>
        <br />
        {tagArr.map(tag => <span className='item-tag'>{tag}</span>)}
      </div>
    </div>
  );
}