import React from 'react';
import axios from 'axios'
import { ArticleItem, Item } from '../../components/articleItem'
import { Tab, TabBar } from 'react-smart-tabs';
import 'react-smart-tabs/dist/bundle.css';
import './index.scss';

const Article: React.FC = () => {
  const [data, setData] = React.useState<any>([])
  const [loaded, setLoaded] = React.useState<boolean>(false)
  React.useEffect(() => {
    axios.get('/article/get-all-list').then(res => {
      setData(res.data)
      setLoaded(true)
    })
  }, [])

  return loaded ? (
    <div className="article-page">
      {/* <h2 className='article-title'>今日精选</h2> */}
      <TabBar newTab={false}>
        <Tab id='1' text="掘金">
          <div className='list-content'>
            {data.juejin.map((item: Item) => {
              return <ArticleItem item={item} />
            })}
          </div>
        </Tab>
        <Tab id='2' text="奇舞周刊">
          <div className='list-content'>
            {data['75team'].map((item: Item) => {
              return <ArticleItem item={item} />
            })}
          </div>
        </Tab>
        <Tab id='3' text="cnnode">
          <div className='list-content'>
            {data.cnnode.map((item: Item) => {
              return <ArticleItem item={item} />
            })}
          </div>
        </Tab>
        <Tab id='4' text="oschina">
          <div className='list-content'>
            {data.oschina.map((item: Item) => {
              return <ArticleItem item={item} />
            })}
          </div>
        </Tab>
      </TabBar>
    </div>
  ) : <div className="article-page">
      加载中。。。
  </div>;
}

export default Article;
