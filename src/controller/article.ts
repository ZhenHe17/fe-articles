import * as createApp from '../createApp'

export const getList = (ctx: createApp.Context) => {
    ctx.result = {
        body: ctx.body
    }
};
