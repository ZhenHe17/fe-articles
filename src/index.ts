import * as createApp from './createApp'
import * as createRouter from './createRouter';
import * as articleController from './controller/article'

const app = new createApp.App()
const router = new createRouter.Router()

router.get('/article/get-75team-list', articleController.get75teamList)
router.post('/article/get-75team-list', articleController.get75teamList)
router.get('/article/get-juejin-list', articleController.getJuejinList)

app.use(router.createRouterMiddleware())

const hostname = '0.0.0.0';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});
