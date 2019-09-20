import React from 'react';
import Header from "../../components/Header"
import { CommunityItem, Item } from '../../components/CommunityItem'
import { CommonPageProps } from "../../types/commonInterface"
import './index.scss';

const Home: React.FC<CommonPageProps> = ({ match }) => {
  return (
    <div className="home-page">
      <Header match={match} />
      <div className="page-content">
        {/* <h2>今日热点</h2> */}
        <h2>社区推荐</h2>
        <div className="row">
          {community.map((item: Item) => {
            return <CommunityItem item={item} key={item.title} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Home;

const community = [
  {
    title: '奇舞周刊',
    href: 'https://weekly.75team.com/',
    img: 'https://p1.ssl.qhimg.com/t019a998a1b366e334e.png',
    desc: '别人家的精选文章',
    bg: '#333 url(//p1.ssl.qhimg.com/t016cd65e58d77a94ee.png)',
  },
  {
    title: '掘金',
    href: 'https://juejin.im/welcome/frontend',
    img: 'https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg',
    desc: '掘金前端精选',
    bg: 'transparent',
  },
  {
    title: 'cnnode',
    href: 'https://cnodejs.org/',
    img: 'https://static2.cnodejs.org/public/images/cnodejs_light.svg',
    desc: 'Node.js中文社区',
    bg: '#444',
  },
  {
    title: '凹凸实验室',
    href: 'https://aotu.io/',
    img: 'https://aotu.io/img/banner.png',
    desc: '京东用户体验设计部',
    bg: '#6190e8',
  },
  {
    title: '奇舞团博客',
    href: 'https://75team.com/post/list',
    img: 'https://75team.com/static/upload/20170409/logo.svg',
    desc: '除了精选还有原创',
    bg: '#FFF',
  },
  {
    title: '程序员导航',
    href: 'https://geekdocs.cn/',
    img: 'https://geekdocs.cn/wp-content/uploads/2019/07/logo-9.png',
    desc: '收录最全的程序员导航',
    bg: '#3295d9',
  },
  {
    title: '淘系前端团队',
    href: 'https://fed.taobao.org/',
    img: 'https://img.alicdn.com/tps/TB1Nv_wKXXXXXbmXVXXXXXXXXXX-295-195.png',
    desc: '用技术为体验提供无限可能',
    bg: '#26272A',
  },
  {
    title: '有赞技术团队',
    href: 'https://tech.youzan.com/tag/front-end/',
    img: 'https://tech.youzan.com/content/images/2017/10/logo.png',
    desc: 'Thoughts, stories and ideas.',
    bg: 'transparent',
  },
]