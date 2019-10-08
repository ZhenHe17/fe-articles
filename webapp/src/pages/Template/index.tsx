import React from 'react';
import Header from "../../components/Header"
import { CommonPageProps } from "../../types/commonInterface"
import './index.scss';

const Page: React.FC<CommonPageProps> = ({ match }) => {
  return (
    <div className="xxx-page">
      <Header match={match} />
    </div>
  )
}

export default Page;
