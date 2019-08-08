import * as createApp from '../createApp';
import * as url from 'url';
import * as http from 'http';
import * as https from 'https';
import * as cheerio from 'cheerio';
import request from '../util/request';
// https://myapit.weipaitang.com/wechat/v1.0/systemnews/real-news
export const get75teamList = (ctx: createApp.Context) => {
    function getCurrentArticles(path: string) {
        return request('https://weekly.75team.com/' + path, {}, (data: any) => {
            const $ = cheerio.load(data);
            const listItems = $('ul li');
            const articleList = [];
            for (let i = 0; i < listItems.length; i++) {
                const item = listItems.eq(i);
                if (!item.children('h2').length) {
                    const title = item.children('h3').text();
                    const href = item.children('h3').find('a').attr('href');
                    const desc = item.children('.desc').text();
                    const tags = [];
                    const tagNodes = item.children('.meta').children('.tag');
                    for (let j = 0; j < tagNodes.length; j++) {
                        const tag = tagNodes.eq(j).text();
                        tags.push(tag);
                    }
                    articleList.push({
                        title,
                        desc,
                        href,
                        tags
                    });
                }
            }
            ctx.result = articleList;
        });
    }
    return request('https://weekly.75team.com/', {}, (data: any) => {
        const $ = cheerio.load(data);
        const links = $('ol.issue-list').find('li a');
        const path = links.eq(0).attr('href');
        return getCurrentArticles(path);
    });
};

export const getJuejinList = (ctx: createApp.Context) => {
    const option = {
        method: 'POST',
        body: {
            operationName: '',
            query: '',
            variables: { category: '5562b415e4b00c57d9b94ac8', first: 20, after: '', order: 'POPULAR' },
            extensions: { query: { id: '653b587c5c7c8a00ddf67fc66f989d42' } }
        },
        headers: {
            'Content-Type': 'application/json',
            'X-Agent': 'Juejin/Web'
        }
    };
    return request('https://web-api.juejin.im/query', option, (data: any) => {
        let list = data.data.articleFeed.items.edges;
        list = list.map((item: any) => {
            item.node.href = item.node.originalUrl;
            return item.node;
        });
        ctx.result = list;
    });
};
