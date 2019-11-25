/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568028903768_9425';

  // add your middleware config here
  config.middleware = [];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      // headerName: 'x-csrf-token', // 自定义请求头
      enable: false, // 自定义请求头
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
