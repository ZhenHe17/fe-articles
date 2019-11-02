const Route = require('./src/Route')
module.exports = {
  webpack: function(config, env) {
    // ...add your webpack config
    // console.log('----------------------------')
    // console.log(env)
    if (env === 'production') {
      config.output.publicPath = Route.publicPath + '/'
    }
    return config;
  },
};