import * as createApp from '../createApp';
import * as url from 'url';
import * as http from 'http';
import * as https from 'https';
import * as cheerio from 'cheerio';
import request from '../util/request';
import connection from '../connectMysql'
// https://myapit.weipaitang.com/wechat/v1.0/systemnews/real-news
export const get75teamList = async (ctx: createApp.Context) => {
    async function getCurrentArticles(path: string) {
        let result: any
        await request('https://weekly.75team.com/' + path, {}, (data: any) => {
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
            result = articleList;
        });
        return result
    }
    let result: any
    await request('https://weekly.75team.com/', {}, (data: any) => {
        const $ = cheerio.load(data);
        const links = $('ol.issue-list').find('li a');
        const path = links.eq(0).attr('href');
        result = getCurrentArticles(path);
    });
    return result
};

export const getJuejinList = async (ctx: createApp.Context) => {
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
    let result: any
    await request('https://web-api.juejin.im/query', option, (data: any) => {
        let list = data.data.articleFeed.items.edges;
        list = list.map((item: any) => {
            item.node.href = item.node.originalUrl;
            return item.node;
        });
        result = list;
    });
    return result
};

export const getCnodeList = async (ctx: createApp.Context) => {
    let result: any
    await request('https://cnodejs.org/?tab=share&page=1', {}, (data: any) => {
        const $ = cheerio.load(data);
        const listItems = $('.topic_title');
        const articleList = [];
        for (let i = 0; i < listItems.length; i++) {
            const item = listItems.eq(i);
            const title = item.attr('title');
            const href = item.attr('href');
            articleList.push({
                title,
                href,
            });
        }
        result = articleList;
    });
    return result
};

export const getOschinaList = async (ctx: createApp.Context) => {
    let result: any
    await request('https://www.oschina.net/blog?classification=428612', {}, (data: any) => {
        const $ = cheerio.load(data);
        const listItems = $('#newestArticleList .blog-item .header');
        const articleList = [];
        for (let i = 0; i < listItems.length; i++) {
            const item = listItems.eq(i);
            const title = item.attr('title');
            const href = item.attr('href');
            articleList.push({
                title,
                href,
            });
        }
        result = articleList;
    });
    return result
};

export const insertArticles = (tableAndKeyName: string, listValues: Array<Array<any>>) => {
    const sql = `INSERT INTO ${tableAndKeyName} VALUES ?`;
    connection.query(sql, [listValues], function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        // console.log(`--------------------------INSERT-${tableAndKeyName}---------------------------`);
        // console.log('INSERT ID:', result);
        // console.log('-----------------------------------------------------------------\n\n');
    });
}

export const queryTodayArticles = (table: string) => {
    return new Promise((resolve, reject) => {
        const now = new Date()
        const sql = `SELECT * FROM ${table} WHERE create_date = '${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}' ORDER BY id`;
        //查
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err)
                return;
            }

            resolve(result)
        });
    })
}