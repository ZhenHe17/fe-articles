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

export const getAllList = async (ctx?: createApp.Context) => {
    const needQueryTableName: Array<string> = []
    const needQuery: Array<any> = []
    const allTableMap: Array<any> = [
        {
            name: '75team',
            service: articleService.get75teamList
        },
        {
            name: 'juejin',
            service: articleService.getJuejinList
        }
    ]
    console.log(`controller----------------!!!getAllList!!!---------------------`)
    // 查询数据库是否有当天已爬取的记录
    await Promise.all(allTableMap.map(item => articleService.queryTodayArticles(`${item.name}_article_tbl`))).then((res: any) => {
        for (let i = 0; i < res.length; i++) {
            const result = res[i];
            if (result && result.length) {
                ctx.result[allTableMap[i].name] = result
            } else {
                needQueryTableName.push(allTableMap[i].name)
                needQuery.push(allTableMap[i].service(ctx))
            }
        }
        return ctx.result
    })
    // 没有记录的重新爬取
    if (needQuery.length) {
        await Promise.all(needQuery).then(res => {
            for (let i = 0; i < needQueryTableName.length; i++) {
                const name = needQueryTableName[i];
                console.log(`----------------!!!重新查询${name}!!!---------------------`)
                ctx.result[name] = res[i]
                const list = res[i].map((item: any) => [
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
    const result: any = await SQLService.queryTable('juejin_article_tbl')
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
