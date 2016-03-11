const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PORT = process.env.PORT || 3000;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: (+PORT + 1),
      proxy: `http://localhost:${PORT}/`,
    }),
  ],
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff(2)?)\??.*$/,
        loader: 'url',
        query: {
          limit: 100000,
        },
      },
    ],
  },
  postcss: () => [
    require('postcss-import'),
    require('postcss-url'),
    require('autoprefixer'),
    require('precss'),
  ],
};
