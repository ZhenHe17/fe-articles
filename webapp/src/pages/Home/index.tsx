import React from 'react';
import axios from 'axios'
import Header from "../../components/Header"
import { IndexItem, Item as IndexItemInterface } from '../../components/IndexItem'
import { CommonPageProps } from "../../types/commonInterface"
import './index.scss';

const Home: React.FC<CommonPageProps> = ({ match }) => {
  const [data, setData] = React.useState<any>({ newestList: [], weeklyList: [] })
  React.useEffect(() => {
    axios.get('/article/get-index').then(res => {
      if (res.data.weeklyList.length % 2 === 1) {
        res.data.weeklyList.push({ title: '', href: '' })
      }
      setData(res.data)
    })
  }, [])
  return (
    <div className="home-page">
      <Header match={match} />
      <div className="page-content">
        <h2>今日热点</h2>
        <div className="row">
          {data.newestList.map((item: IndexItemInterface) => {
            return <IndexItem className="col-50" item={item} key={item.title} />
          })}
        </div>
        <h2>每周精选</h2>
        <div className="row">
          {data.weeklyList.map((item: IndexItemInterface) => {
            return <IndexItem className="col-50" item={item} key={item.title} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Home;
