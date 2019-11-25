import React from 'react';
import './index.scss';

interface CommunityItemProps {
  item: Item
}

export interface Item {
  title: string,
  href: string,
  img: string,
  desc: string,
  bg: string,
}

export const CommunityItem: React.FC<CommunityItemProps> = ({ item }) => {
  return (
    <a className="community-item col-25 col-sm-100" href={item.href} rel="noopener noreferrer" target='_blank'>
      <div className="container">
        <div className="img-container" style={{ background: item.bg }}>
          <img className="img" src={item.img} alt="" />
        </div>
        <div>
          <p className="title">{item.title}</p>
          <p className="desc">{item.desc}</p>
        </div>
      </div>
    </a>
  );
}