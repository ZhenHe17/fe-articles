import * as http from 'http';
import * as url from 'url';

export interface Context {
    req: http.IncomingMessage;
    res: http.ServerResponse;
    parsedUrl: url.Url;
    result: any;
    body: any;
}

export class App {
    middleware: Array<Function> = [];
    listen(...args: any[]) {
        const server = http.createServer(this.callback());
        return server.listen(...args);
    }

    use(fn: Function) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        this.middleware.push(fn);
        return this;
    }

    callback() {
        return async (req: http.IncomingMessage, res: http.ServerResponse) => {
            const parsedUrl: url.Url = url.parse(req.url, true);
            const ctx: Context = {
                req,
                res,
                parsedUrl,
                result: {},
                body: {}
            };
            for (const fn of this.middleware) {
                await fn(ctx);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(ctx.result));
        };
    }
}
