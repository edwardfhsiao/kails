var _ = require('lodash');
var development = require('./development');
var test = require('./test');
var production = require('./production');

var env = process.env.NODE_ENV || 'development';
var configs = {
  development: development,
  test: test,
  production: production
};
var defaultConfig = {
  env: env
};

var config = _.merge(defaultConfig, configs[env]);

config.locale = 'zh-CN';
config.locales = ['zh-CN', 'en-US', 'zh-TW'];

module.exports = config;
