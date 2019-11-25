import React from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import Header from "../../components/Header"
import { CommonPageProps } from "../../types/commonInterface"
// import { IndexItem, Item as IndexItemInterface } from '../../components/IndexItem'
import './index.scss';

const columns = [
  {
    title: '待审核文章',
    dataIndex: 'title',
  },
  {
    title: '文章描述',
    dataIndex: 'desc',
  },
  {
    title: '文章链接',
    dataIndex: 'href',
    render: (text: any) => {
      return <a target="_blank" rel="noopener noreferrer" className="table-link" href={text}>查看文章</a>;
    }
  },
  {
    title: '文章标签',
    dataIndex: 'tag',
  },
  {
    title: '推荐人',
    dataIndex: 'referrer',
  },
];

const InsertPage: React.FC<CommonPageProps> = ({ match }) => {
  const [data, setData] = React.useState<any>([])
  const [rows, setRows] = React.useState<Array<any>>([])
  const getData = React.useCallback(()=>{
    return axios.get('recommend-article/get-review-article').then(res => {
      setData(res.data)
    })
  }, [])
  const updateStatus = React.useCallback((status: number) => {
    return axios({
      method: 'post',
      url: 'recommend-article/update-status-article',
      data: { rows, status }
    });
  }, [rows])
  React.useEffect(() => {
    getData()
  }, [getData])
  const pass = React.useCallback(async ()=>{
    await updateStatus(1)
    message.success('审核文章成功！');
    getData()
  }, [getData, updateStatus])
  const ignore = React.useCallback(async ()=>{
    await updateStatus(2)
    message.success('忽略文章成功！');
    getData()
  }, [getData, updateStatus])
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setRows(selectedRows.map((row: any) => row.id))
    }
  };
  return (
    <div className="admin-review-page">
      <Header match={match} />
      <div className="page-content">
        <div className="buttons-container">
          批量操作
          <Button onClick={pass} type="primary">审核通过</Button>
          <Button onClick={ignore} type="danger">不再显示</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        {/* {
          data.recommendArticle && !!data.recommendArticle.length && (
            <>
              <p>当前展示的推荐文章</p>
              <div className="row">
                {data.recommendArticle.map((item: IndexItemInterface) => {
                  return <IndexItem className="col-50" item={item} key={item.title} />
                })}
              </div>
            </>
          )
        } */}
      </div>
    </div>
  )
}

export default InsertPage;
