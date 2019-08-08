import * as url from 'url';
import * as http from 'http';
import * as https from 'https';

export interface RequestOption {
    method?: string
    body?: any;
    headers?: any;
}

export default function request(urlstr: string, requestOption: RequestOption, callback?: Function) {
    return new Promise((resolve, reject) => {
        const bodyQueryStr = requestOption.body
        const contentStr = JSON.stringify(bodyQueryStr);
        const httpModule = urlstr.indexOf('https') === 0 ? https : http;
        const urlData = url.parse(urlstr);
        const option = {
            hostname: urlData.hostname,
            path: urlData.path,
            method: requestOption.method || 'GET',
            headers: requestOption.headers
        };
        const httpRequest = httpModule
            .request(option, (res) => {
                let data: any = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', async () => {
                    if (res.headers["content-type"] == 'application/json') {
                        data = JSON.parse(data);
                    }
                    await callback(data)
                    resolve();
                });
            })
            .on('error', (err) => {
                console.log('Error: ' + err.message);
                reject('Error: ' + err.message);
            });
        httpRequest.write(contentStr || '');
        httpRequest.end();
    });
}
