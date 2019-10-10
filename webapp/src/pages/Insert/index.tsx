import React from 'react';
import axios from 'axios';
// import Input from 'antd/es/input';
// import 'antd/es/input/style/css';
import Header from "../../components/Header"
import { CommonPageProps } from "../../types/commonInterface"
import './index.scss';

function getCookie(name: string){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  arr=document.cookie.match(reg)
  if(arr){
    return unescape(arr[2]);
  } else {
    return null;
  }
}

const InsertPage: React.FC<CommonPageProps> = ({ match }) => {
  const insertArticle = () => {
    axios({
      method: 'post',
      url: '/article/insert',
      headers:{
        'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
      },
      data: {
        title: 'title2222',
        href: 'href',
        tag: 'tag',
        desc: 'desc',
      }
    });
  }
  return (
    <div className="insert-page">
      <Header match={match} />
      <div className="page-content">
        <button onClick={insertArticle}>投递文章</button>
        {/* <Input /> */}
      </div>
    </div>
  )
}

export default InsertPage;
