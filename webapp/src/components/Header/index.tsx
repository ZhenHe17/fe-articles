import React from 'react';
import { Link } from "react-router-dom";
import { publicPath } from "../../Route";
import './index.scss';

interface HeaderProps {
  match: any
}

const navList = [
  {
    path: '/',
    name: '首页'
  },
  {
    path: '/community',
    name: '社区推荐'
  },
  {
    path: '/articles/:category',
    link: '/articles/juejin',
    name: '文章汇总'
  },
  {
    path: '/recommendArticle',
    name: '我要投稿'
  },
]

const Header: React.FC<HeaderProps> = ({ match }) => {
  return (
    <>
      <div className="main-header-holder" />
      <div className="main-header">
        <div className="header-container">
          <h1>前端微热点</h1>
          {navList.map(nav => {
            const path = publicPath + nav.path
            const link = publicPath + (nav.link || nav.path)
            return <Link className={`nav-item ${match.path === path && 'active'}`} to={link}>{nav.name}</Link>
          })}
        </div>
      </div>
    </>
  );
}

export default Header;