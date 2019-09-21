import React from 'react';
import { Link } from "react-router-dom";
import './index.scss';

interface HeaderProps {
  match: any
}

const Header: React.FC<HeaderProps> = ({ match }) => {
  return (
    <>
      <div className="main-header-holder" />
      <div className="main-header">
        <div className="header-container">
          <h1>前端微日报</h1>
          <Link className={`nav-item ${match.path === '/' && 'active'}`} to='/'>首页</Link>
          <Link className={`nav-item ${match.path === '/community' && 'active'}`} to='/community'>社区推荐</Link>
          <Link className={`nav-item ${match.path === '/articles/:category' && 'active'}`} to='/articles/juejin'>文章汇总</Link>
        </div>
      </div>
    </>
  );
}

export default Header;