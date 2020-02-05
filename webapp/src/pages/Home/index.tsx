import React from 'react';
import axios from 'axios'
import Header from "../../components/Header"
import Loading from "../../components/Loading"
import { query } from "../../lib/utils/index"
import { IndexItem, Item as IndexItemInterface } from '../../components/IndexItem'
import { CommonPageProps } from "../../types/commonInterface"
import './index.scss';

const Home: React.FC<CommonPageProps> = ({ match, history }) => {
  const [data, setData] = React.useState<any>({ articleList: [], totalEdition: 0 })
  const [edition, setEdition] = React.useState<number>(Number(query().edition))
  const [search, setSearch] = React.useState<string>(query().search)
  const [searchResult, setSearchResult] = React.useState<any>([])
  const [isSearch, setIsSearch] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)

  const getData = React.useCallback((edition = 0, callback = ()=>{}) => {
    const params: any = {}
    if (edition) {
      params.edition = edition
    }
    axios.get('/recommend-article', { params }).then(res => {
      setData(res.data)
      setLoading(false)
      callback && callback()
      window.scrollTo({top: 0, behavior: 'auto'});
    })
  }, [])

  const getSearchResult = React.useCallback(() => {
    if (!search) {
      return
    }

    axios.get('/recommend-article/search', { params: { search: encodeURIComponent(search) } }).then(res => {
      setSearchResult(res.data)
      setLoading(false)
      setIsSearch(true)
      window.scrollTo({top: 0, behavior: 'auto'});
    })
  }, [search])

  const handleClickEdition = React.useCallback((_edition = 0) => () => {
    if (_edition !== edition) {
      history.replace(`${history.location.pathname}?edition=${encodeURIComponent(_edition)}`)
    }
  }, [ edition, history])

  const handleSearch = React.useCallback(() => {
    history.replace(`${history.location.pathname}?search=${encodeURIComponent(search)}`)
  }, [history, search])

  const handleKeyDown = React.useCallback((e) => {
    if (e.keyCode === 13) {
      history.replace(`${history.location.pathname}?search=${encodeURIComponent(search)}`)
    }
  }, [history, search])

  const renderEditionNum = React.useCallback((totalEdition: number) => {
    const result: React.ReactElement[] = []
    for (let index = 1; index <= totalEdition; index++) {
      result.push(<div className={`edition-item col-100 ${index === edition && 'active'}`} onClick={handleClickEdition(index)}>周刊第{index}期</div>)
    }
    return result
  }, [handleClickEdition, edition])

  React.useEffect(() => {
    const _edition = Number(query().edition)
    getData(_edition || 0, ()=>{
      setIsSearch(!!query().search);
      setEdition(_edition)
    })
    if (!!query().search) {
      getSearchResult()
    }
  // eslint-disable-next-line
  }, [ match, history ])

  return (
    <div className="home-page">
      <Header match={match} />
      <div className="page-content">
        <Loading
          loading={loading}
          loadingAnimation={true}
        >
          <div className="side-bar">
            <div>
              <div className="row">
                <div className="search-box">
                  <input onKeyDown={handleKeyDown} value={search} onChange={ e =>{ setSearch(e.target.value) }} className="search-input" placeholder="搜索想看的文章" type="text"/>
                  <img onClick={handleSearch} src="" alt="搜索" className="search-img" />
                </div>
                {renderEditionNum(data.totalEdition)}
              </div>
            </div>
          </div>
          <div className="scroll-wrapper">
            {
              isSearch ? ((searchResult && !!searchResult.length) ? (
                <div className="article-wrapper">
                  <h2>搜索结果</h2>
                  <div className="article-list">
                    <div className="row">
                      {searchResult.map((item: IndexItemInterface, index: number) => {
                        return <IndexItem className="col-100 article-border" item={item} key={index} />
                      })}
                    </div>
                  </div>
                </div>
              ) : <h2>没有搜索到相关文章</h2>) : (data.articleList && !!data.articleList.length && (
                <div className="article-wrapper">
                  <h2>周刊第{edition || data.totalEdition}期</h2>
                  <div className="article-list">
                    <div className="row">
                      {data.articleList.map((item: IndexItemInterface, index: number) => {
                        return <IndexItem className="col-100 article-border" item={item} key={index} />
                      })}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="pc-hide">
            <h2>往期周刊</h2>
            <div className="row">
              {renderEditionNum(data.totalEdition)}
            </div>
          </div>
        </Loading>
      </div>
    </div>
  )
}

export default Home;
