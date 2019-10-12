import React from 'react';
import axios from 'axios'
import Header from "../../components/Header"
import Loading from "../../components/Loading"
import { IndexItem, Item as IndexItemInterface } from '../../components/IndexItem'
import { CommonPageProps } from "../../types/commonInterface"
import './index.scss';

const Home: React.FC<CommonPageProps> = ({ match }) => {
  const [data, setData] = React.useState<any>({ newestList: [], juejinWeeklyArticle: [], teamArticle: [] })
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    axios.get('/article/get-index').then(res => {
      if (res.data.teamArticle.length % 2 === 1) {
        res.data.teamArticle.push({ title: '', href: '' })
      }
      if (res.data.recommendArticle.length % 2 === 1) {
        res.data.recommendArticle.push({ title: '', href: '' })
      }
      setData(res.data)
      setLoading(false)
    })
  }, [])
  return (
    <div className="home-page">
      <Header match={match} />
      <div className="page-content">
        <Loading
          loading={loading}
          loadingAnimation={true}
        >
          {
            data.recommendArticle && !!data.recommendArticle.length && (
              <>
                <h2>推荐文章</h2>
                <div className="row">
                  {data.recommendArticle.map((item: IndexItemInterface) => {
                    return <IndexItem className="col-50" item={item} key={item.title} />
                  })}
                </div>
              </>
            )
          }
          <h2>奇舞周刊</h2>
          <div className="row">
            {data.teamArticle.map((item: IndexItemInterface) => {
              return <IndexItem className="col-50" item={item} key={item.title} />
            })}
          </div>
          <h2>掘金每周热门</h2>
          <div className="row">
            {data.juejinWeeklyArticle.map((item: IndexItemInterface) => {
              return <IndexItem className="col-50" item={item} key={item.title} />
            })}
          </div>
          <h2>今日热点</h2>
          <div className="row">
            {data.newestList.map((item: IndexItemInterface) => {
              return <IndexItem className="col-50" item={item} key={item.title} />
            })}
          </div>
        </Loading>
      </div>
    </div>
  )
}

export default Home;
