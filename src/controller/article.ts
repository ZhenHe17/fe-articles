import * as createApp from '../createApp';
import * as https from 'https';
import * as cheerio from 'cheerio';
// https://myapit.weipaitang.com/wechat/v1.0/systemnews/real-news
export const getList = (ctx: createApp.Context) => {
    return new Promise((resolve, reject)=>{
        https
            .get('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map', (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    const $ = cheerio.load(data)
                    ctx.result = $('div.document-title h1').html()
                    resolve()
                });
            })
            .on('error', (err) => {
                console.log('Error: ' + err.message);
                reject('Error: ' + err.message)
            });
    })
};
