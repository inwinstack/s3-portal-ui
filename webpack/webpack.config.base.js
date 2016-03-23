const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    './src',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
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
        exclude: path.join(__dirname, '../src/templates'),
        loader: 'raw',
      },
      {
        test: /\.html$/,
        include: path.join(__dirname, '../src/templates'),
        loader: 'ng-cache',
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
