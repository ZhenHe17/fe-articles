import React from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";
import Header from "../../components/Header"
import { CommonPageProps } from "../../types/commonInterface"
import { ArticleItem, Item } from '../../components/ArticleItem'
import 'react-smart-tabs/dist/bundle.css';
import './index.scss';

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
          <Link className={`nav-item ${match.url === '/articles/juejin' && 'active'}`} to='/articles/juejin'>掘金</Link>
          <Link className={`nav-item ${match.url === '/articles/75team' && 'active'}`} to='/articles/75team'>奇舞周刊</Link>
          <Link className={`nav-item ${match.url === '/articles/jianshu' && 'active'}`} to='/articles/jianshu'>简书</Link>
          <Link className={`nav-item ${match.url === '/articles/cnnode' && 'active'}`} to='/articles/cnnode'>cnnode</Link>
          <Link className={`nav-item ${match.url === '/articles/oschina' && 'active'}`} to='/articles/oschina'>oschina</Link>
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
