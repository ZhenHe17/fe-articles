'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/article/info', controller.article.info);
  router.get('/article/insert', controller.article.insert);
  router.get('/article/get-index', controller.article.getIndex);
  router.get('/article/get-75team-list', controller.article.get75teamList);
  router.get('/article/get-juejin-list', controller.article.getJuejinList);
  router.get('/article/get-cnnode-list', controller.article.getCnodeList);
  router.get('/article/get-oschina-list', controller.article.getOschinaList);
  router.get('/article/get-all-list', controller.article.getAllList);
  router.get('/article/get-jianshu-list', controller.article.getJianshuList);
};
