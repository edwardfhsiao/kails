const base = require('./base.js');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const postcssReporter = require("postcss-reporter");

const config = _.merge(base, {
  devtool: 'cheap-module-source-map'
});

config.output = _.merge(config.output, {
  filename: '[name]_bundle-[chunkhash].js'
});

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
       NODE_ENV: JSON.stringify('production')
     }
  }),
  new webpack.optimize.CommonsChunkPlugin('application', 'application_bundle-[hash].js'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.MinChunkSizePlugin({
    compress: {
      warnings: false
    }
  }),
  // new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
  }),
  new ExtractTextPlugin('[name]_bundle-[hash].css', {
    allChunks: true
  })
);

config.postcss = function(webpack) {
  return [
    postcssImport({addDependencyTo: webpack}),
    cssnext({autoprefixer: {browsers: "ie >= 9, ..."}}),
    postcssReporter({clearMessages: true})
  ]
};

module.exports = config;
