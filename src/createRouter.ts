import * as createApp from './createApp';
const { parse } = require('querystring');

interface RouterMap {
    get: Map<string, Function>;
    post: Map<string, Function>;
    put: Map<string, Function>;
    delete: Map<string, Function>;
}

export interface Router {
    routerMap: RouterMap;
}

export class Router {
    routerMap = {
        get: new Map<string, Function>(),
        post: new Map<string, Function>(),
        put: new Map<string, Function>(),
        delete: new Map<string, Function>()
    };

    public createRouter() {
        const _this = this
        return (ctx: createApp.Context) => {
            return new Promise((resolve, reject) => {
                const method = ctx.req.method.toLowerCase();
                async function exec() {
                    const controller = _this.routerMap[method].get(ctx.parsedUrl.pathname);
                    if (controller) {
                        await controller(ctx);
                        ctx.res.statusCode = 200;
                    } else {
                        ctx.res.statusCode = 404;
                    }
                    resolve();
                }
                try {
                    if (method === 'post') {
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
                } catch (error) {
                    reject(error);
                }
            });
        };
    }

    public get(path: string, controller: Function): void {
        this.setRouterMap('get', path, controller);
    }

    public post(path: string, controller: Function): void {
        this.setRouterMap('post', path, controller);
    }

    public put(path: string, controller: Function): void {
        this.setRouterMap('put', path, controller);
    }

    public delete(path: string, controller: Function): void {
        this.setRouterMap('delete', path, controller);
    }
    private setRouterMap(method: string, path: string, controller: Function): void {
        this.routerMap[method].set(path, controller);
    }
}
