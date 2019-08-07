import * as createApp from '../createApp';
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
                        const articleList = []
                        for (let i = 0; i < listItems.length; i++) {
                            const item = listItems.eq(i);
                            if (item.children('h2').length) {
                                articleList.push({
                                    cate: item.children()[0].name,
                                    list: []
                                })
                            } else {
                                const title = item.children('h3').text()
                                const desc = item.children('.desc').text()
                                articleList[articleList.length - 1].list.push({
                                    title,
                                    desc,
                                })
                            }
                        }
                        ctx.result.articleList = articleList
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
                    ctx.result.link = path
                    ctx.result.title = links.eq(0).text()
                    getCurrentArticles(path);
                });
            })
            .on('error', (err) => {
                console.log('Error: ' + err.message);
                reject('Error: ' + err.message);
            });
    });
};
