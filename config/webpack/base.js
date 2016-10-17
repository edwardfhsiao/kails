const webpack = require('webpack');
const path = require('path');
const publicPath = path.resolve(__dirname, '../', '../', 'public', 'assets');
const ManifestPlugin = require('webpack-manifest-plugin');
const assetHost = require('../config').assetHost;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylelint = require('stylelint');
const postcssImport = require('postcss-import');
// const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

module.exports = {
  context: path.resolve(__dirname, '../', '../'),
  entry: {
    application: './app/assets/javascripts/application.js',
    index: './app/assets/javascripts/index.js',
    articles: './app/assets/javascripts/articles.js',
    editor: './app/assets/javascripts/editor.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: ['babel-loader'],
      query: {
        presets: ['react', 'es2015']
      }
    },{
      test: /\.coffee$/,
      exclude: /node_modules/,
      loader: 'coffee-loader'
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
      loader: 'url-loader?limit=8192&name=[name].[ext]'
    },
    {
      test: /\.(jpe?g|png|gif|svg)\??.*$/,
      loader: 'url-loader?limit=8192&name=[name].[ext]'
    },
    {
        test: /\.(css|scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.json']
  },
  output: {
    path: publicPath,
    publicPath: assetHost + '/assets/',
    filename: '[name]_bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin({
      fileName: 'kails_manifest.json'
    })
  ],
  eslint: {
    configFile: '.eslintrc.json',
    failOnError: false
  },
  postcss: function(webpack) {
    return [
      postcssImport({addDependencyTo: webpack}),
      stylelint({
        config: require('../stylelint.config.js'),
        failOnError: true
      }),
      // do not autoprefixer the css because of style lint in development env,
      // whereas it will be called in production env, see production.config.js

      // cssnext({autoprefixer: {browsers: "ie >= 9, ..."}}),
      postcssReporter({clearMessages: true})
    ];
  }
};