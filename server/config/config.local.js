/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = {
  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'wptroot',
      // 数据库名
      database: 'article',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
  redis: {
    client: {
      port: 6379,
      host: 'localhost',
      password: '',
      db: 0,
    },
  },
};
