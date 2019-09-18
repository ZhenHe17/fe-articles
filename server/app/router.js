'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/article/info', controller.article.info);
  router.get('/article/insert', controller.article.insert);
};
