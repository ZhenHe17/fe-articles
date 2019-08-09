import * as createApp from '../createApp';
import * as articleService from '../service/article';
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
    await Promise.all([articleService.get75teamList(ctx), articleService.getJuejinList(ctx)]).then(res => {
        ctx.result['75team'] = res[0]
        ctx.result.juejin = res[1]
    })
    return ctx.result
};
