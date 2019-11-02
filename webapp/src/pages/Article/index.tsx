import React from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import { publicPath } from "../../Route";
import Header from "../../components/Header"
import { CommonPageProps } from "../../types/commonInterface"
import { ArticleItem, Item } from '../../components/ArticleItem'
import './index.scss';

const navList = [
  {
    path: '/articles/juejin',
    name: '掘金'
  },
  {
    path: '/articles/75team',
    name: '奇舞周刊'
  },
  {
    path: '/articles/jianshu',
    name: '简书'
  },
  {
    path: '/articles/cnnode',
    name: 'cnnode'
  },
  {
    path: '/articles/oschina',
    name: 'oschina'
  },
]

const Article: React.FC<CommonPageProps> = ({ match }) => {
  const [data, setData] = React.useState<any>([])
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const category = match.params.category;
  React.useEffect(() => {
    axios.get('/article/get-all-list').then(res => {
      setData(res.data)
      setLoaded(true)
    })
  }, [])

  return loaded ? (
    <div className="article-page">
      <Header match={match} />
      <div className="page-content">
        <div className="container">
          {navList.map(nav => {
            const path = publicPath + nav.path
            return <Link className={`nav-item ${match.url === path && 'active'}`} to={path}>{nav.name}</Link>
          })}
        </div>
        <div className='list-content'>
          {data[category].map((item: Item) => {
            return <ArticleItem item={item} key={item.id} />
          })}
        </div>
      </div>
    </div>
  ) : <div className="article-page">
      <Header match={match} />
      <div className="page-content">
        加载中...
      </div>
    </div>;
}

export default Article;
