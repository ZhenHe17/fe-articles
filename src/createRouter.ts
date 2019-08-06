import * as createApp from './createApp';
const { parse } = require('querystring');

export const Router = (routerMap: Map<String, Function>) => {
    return (ctx: createApp.Context) => {
        return new Promise((resolve, rejects) => {
            async function exec() {
                const controller = routerMap.get(ctx.parsedUrl.pathname);
                if (controller) {
                    await controller(ctx);
                    ctx.res.statusCode = 200;
                } else {
                    ctx.res.statusCode = 404;
                }
                resolve();
            }
            if (ctx.req.method === 'POST') {
                let str = '';
                ctx.req.on('data', (chunk) => {
                    str += chunk.toString();
                });
                ctx.req.on('end', () => {
                    ctx.body = parse(str);
                    exec();
                });
            } else {
                exec();
            }
        });
    };
};
