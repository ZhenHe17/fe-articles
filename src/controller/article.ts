import * as createApp from '../createApp';
import * as articleService from '../service/article';
import * as SQLService from '../service/commonSQL';
import connection from '../connectMysql'
// https://myapit.weipaitang.com/wechat/v1.0/systemnews/real-news
export const get75teamList = async (ctx: createApp.Context) => {
    ctx.result = await articleService.get75teamList(ctx)
    return ctx.result
};

export const getJuejinList = async (ctx: createApp.Context) => {
    ctx.result = await articleService.getJuejinList(ctx)
    return ctx.result
};

export const getAllList = async (ctx: createApp.Context) => {
    const needQueryTableName: Array<string> = []
    const needQuery: Array<any> = []
    const allTableName: Array<string> = ['75team', 'juejin']
    // 查询数据库是否有当天已爬取的记录
    await Promise.all(allTableName.map(name => SQLService.queryTable(`${name}_article_tbl`))).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
            const result = res[i];
            const createTime = result[0].create_date.getTime()
            const nowTime = new Date().getTime()
            if (nowTime - 86400000 <= createTime) {
                ctx.result[allTableName[i]] = result
            } else {
                needQueryTableName.push(allTableName[i])
                switch (allTableName[i]) {
                    case '75team':
                        needQuery.push(articleService.get75teamList(ctx))
                        break;
                    case 'juejin':
                        needQuery.push(articleService.getJuejinList(ctx))
                        break;
                }
            }
        }
        return ctx.result
    })
    // 没有记录的重新爬取
    if (needQuery.length) {
        await Promise.all(needQuery).then(res => {
            for (const name of needQueryTableName) {
                console.log(`----------------!!!重新查询${name}!!!---------------------`)
                ctx.result[name] = res[0]
                const list = res[0].map((item: any) => [
                    item.title,
                    item.href,
                    new Date(),
                ])
                articleService.insertArticles(name + '_article_tbl(`title`,`href`, `create_date`)', list)
            }
        })
    }
    return ctx.result
};

export const queryListTime = async (ctx: createApp.Context) => {
    const result:any = await SQLService.queryTable('juejin_article_tbl')
    const createTime = result[0].create_date.getTime()
    const nowTime = new Date().getTime()
    if (nowTime - 86400000 <= createTime) {
        ctx.result = result
        return ctx.result
    } 
    console.log(ctx.result[0].create_date.getTime())
    console.log(new Date().getTime())
    return ctx.result
};
