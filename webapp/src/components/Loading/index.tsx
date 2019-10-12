import React, { PureComponent } from 'react';
import './index.scss';

// 简单的Loading组件 解决页面加载中或者空数据时的多个三元运算符
// 简单例子 1个prop
// loading: Boolean true显示空白 false显示children
// <Loading loading={loading}>
//     <Page />
// </Loading>

// 复杂例子 4个prop
// loading: Boolean true时正在加载 加载时显示空白或者加载动画 加载结束后显示children或emptyData
// showEmptyData: Boolean true时在加载好后显示emptyData
// emptyData: Component showEmptyData为true时显示的内容
// loadingAnimation: Boolean 控制加载中是否显示加载动画

// const { list, loading } = this.state;
// const emptyData = <EmptyData title="暂无数据" imageSrc={EmptyData.imageType.good} />
// <Loading
//     loading={loading}
//     showEmptyData={list && list.length == 0}
//     emptyData={emptyData}
//     loadingAnimation={true}
// >
//     <Page />
// </Loading>

const loadingSVG = (
    <svg
        className='loadingSVG'
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
        fill="#AB3B3A"
    >
        <path
            opacity=".25"
            d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4 s12,5.4,12,12S22.6,28,16,28z"
        />
        <path d="M16,0.8L16,0.8C16,0.8,16,0.8,16,0.8c-0.7,0-1.3,0.6-1.3,1.3s0.6,1.3,1.3,1.3c0,0,0,0,0,0v0 C23,3.3,28.7,9,28.7,16c0,0,0,0,0,0c0,0.7,0.6,1.3,1.3,1.3c0.7,0,1.3-0.6,1.3-1.3C31.2,7.6,24.4,0.8,16,0.8z">
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 16 16"
                to="360 16 16"
                dur="0.8s"
                repeatCount="indefinite"
            />
        </path>
    </svg>
);

export default class Loading extends PureComponent {
    static defaultProps = {
        loading: true,
        showEmptyData: false,
        emptyData: null,
        loadingAnimation: false,
    };

    render() {
        const { children, loading, showEmptyData, emptyData, loadingAnimation } = this.props as any;
        const loadingDOM = loadingAnimation ? loadingSVG : null;
        return loading ? loadingDOM : showEmptyData ? emptyData : children;
    }
}
