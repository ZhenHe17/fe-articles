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
  function handleClick() {
    window.open(item.href, "_blank");
  }
  return (
    <div className={"index-item " + className} title={item.title} onClick={handleClick}>
      <div className="bg">
        <div  className="title">{item.title}</div>
        {item.desc && <span className="desc">{item.desc}</span>}
        {tagArr && !!tagArr.length && <br />}
        {tagArr.map(tag => <span className='item-tag'>{tag}</span>)}
      </div>
    </div>
  );
}