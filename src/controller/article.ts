import * as createApp from '../createApp';
import * as articleService from '../service/article';
// https://myapit.weipaitang.com/wechat/v1.0/systemnews/real-news
export const get75teamList = (ctx: createApp.Context) => {
    return articleService.get75teamList(ctx)
};

export const getJuejinList = (ctx: createApp.Context) => {
    return articleService.getJuejinList(ctx)
};
