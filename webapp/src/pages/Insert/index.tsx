import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import Header from "../../components/Header"
import { CommonPageProps } from "../../types/commonInterface"
import './index.scss';

interface formData {
  title: string,
  href: string,
  desc: string,
  tag: string,
  [key: string]: any,
}

const InsertPage: React.FC<CommonPageProps> = ({ match, form }) => {
  const [pending, setPending] = useState<boolean>(false)
  const [formData, setFormData] = useState<formData>({
    title: '',
    href: '',
    desc: '',
    tag: '',
  })
  const insertArticle = (e: any) => {
    e.preventDefault();
    setPending(true)
    setTimeout(() => {
      setPending(false)
    }, 2000);
    form.validateFieldsAndScroll(async (err: any, values: any) => {
      if (!err) {
        await axios({
          method: 'post',
          url: '/article/insert',
          data: formData
        });
        message.success('推荐文章成功！');
      }
      console.log('Received values of form: ', values);
    });
  }
  const onFormChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [key]: e.target.value
    })
    form.setFieldsValue({
      [key]: e.target.value
    })
  }
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  }
  return (
    <div className="insert-page">
      <Header match={match} />
      <div className="page-content">
        <Form>
          <Form.Item label="文章标题" {...formItemLayout}>
            {form.getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input maxLength={99} onChange={onFormChange('title')} placeholder="请输入文章标题" />)}
          </Form.Item>
          <Form.Item label="文章链接" {...formItemLayout}>
            {form.getFieldDecorator('href', {
              rules: [
                {
                  type: 'url',
                  message: '请输入正确的链接url',
                },
                {
                  required: true,
                  message: '请输入文章链接',
                },
              ],
            })(< Input maxLength={199} onChange={onFormChange('href')} placeholder="请输入文章链接" />)}
          </Form.Item>
          <Form.Item label="文章描述" {...formItemLayout}>
            <Input maxLength={99} onChange={onFormChange('desc')} value={formData.desc} placeholder="请输入文章描述" />
          </Form.Item>
          <Form.Item label="文章标签" {...formItemLayout}>
            <Input maxLength={99} onChange={onFormChange('tag')} value={formData.tag} placeholder="多个标签用半角逗号隔开" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button onClick={insertArticle} loading={pending} type="primary">推荐文章</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Form.create({ name: 'recommend' })(InsertPage);
