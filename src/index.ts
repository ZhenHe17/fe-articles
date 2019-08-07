import * as createApp from './createApp'
import * as createRouter from './createRouter';
import * as articleController from './controller/article'

const app = new createApp.App()
const crRouter = new createRouter.Router()

crRouter.get('/article/get-75team-list', articleController.get75teamList)
crRouter.post('/article/get-75team-list', articleController.get75teamList)
crRouter.get('/article/get-juejin-list', articleController.getJuejinList)

app.use(crRouter.createRouterMiddleware())

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});
