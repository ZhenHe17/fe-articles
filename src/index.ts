import * as createApp from './createApp'
import * as createRouter from './createRouter';
import * as articleController from './controller/article'

const hostname = '127.0.0.1';
const port = 3000;

const app = new createApp.App()

const routerMap:Map<String, Function> = new Map()
routerMap.set('/article/get-75team-ist', articleController.get75teamList)

const crRouter = createRouter.Router(routerMap)
app.use(crRouter)

app.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});
