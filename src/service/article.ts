import * as createApp from '../createApp';
import * as url from 'url';
import * as util from 'util';
import * as querystring from 'querystring';
import * as http from 'http';
import * as https from 'https';
import * as cheerio from 'cheerio';
// https://myapit.weipaitang.com/wechat/v1.0/systemnews/real-news
export const get75teamList = (ctx: createApp.Context) => {
    return new Promise((resolve, reject) => {
        function getCurrentArticles(path: string) {
            https
                .get('https://weekly.75team.com/' + path, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        const $ = cheerio.load(data);
                        const listItems = $('ul li');
                        const articleList = [];
                        for (let i = 0; i < listItems.length; i++) {
                            const item = listItems.eq(i);
                            if (item.children('h2').length) {
                                // articleList.push({
                                //     cate: item.children('h2').text(),
                                //     list: []
                                // });
                            } else {
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
                                // articleList[articleList.length - 1].list.push({
                                //     title,
                                //     desc,
                                //     tags
                                // });
                            }
                        }
                        ctx.result = articleList;
                        // ctx.result.articleList = articleList;
                        resolve(ctx);
                    });
                })
                .on('error', (err) => {
                    console.log('Error: ' + err.message);
                    reject('Error: ' + err.message);
                });
        }
        https
            .get('https://weekly.75team.com/', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    const $ = cheerio.load(data);
                    const links = $('ol.issue-list').find('li a');
                    const path = links.eq(0).attr('href');
                    // ctx.result.link = path;
                    // ctx.result.title = links.eq(0).text();
                    getCurrentArticles(path);
                });
            })
            .on('error', (err) => {
                console.log('Error: ' + err.message);
                reject('Error: ' + err.message);
            });
    });
};

export const getJuejinList = (ctx: createApp.Context) => {
    return new Promise((resolve, reject) => {
        const urlstr = 'https://web-api.juejin.im/query';
        const bodyQueryStr = {
            operationName: '',
            query: '',
            variables: { category: '5562b415e4b00c57d9b94ac8', first: 20, after: '', order: 'POPULAR' },
            extensions: { query: { id: '653b587c5c7c8a00ddf67fc66f989d42' } }
        };
        const contentStr = JSON.stringify(bodyQueryStr);
        const contentLen = Buffer.byteLength(contentStr, 'utf8');
        const httpModule = urlstr.indexOf('https') === 0 ? https : http;
        const urlData = url.parse(urlstr);
        const option = {
            hostname: urlData.hostname,
            path: urlData.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Length': contentLen,
                'X-Agent': 'Juejin/Web'
            }
        };
        const httpRequest = httpModule
            .request(option, (res) => {
                let data: any = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    data = JSON.parse(data)
                    let list = data.data.articleFeed.items.edges
                    list = list.map((item: any)=>{
                        item.node.href = item.node.originalUrl
                        return item.node
                    })
                    ctx.result = list;
                    resolve();
                });
            })
            .on('error', (err) => {
                console.log('Error: ' + err.message);
                reject('Error: ' + err.message);
            });
        httpRequest.write(contentStr);
        httpRequest.end();
    });
};
