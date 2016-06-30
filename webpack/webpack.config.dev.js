const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PORT = process.env.PORT || 6000;
const config = require('./webpack.config.base');

config.entry.push('webpack-hot-middleware/client');
config.output.publicPath = '/static/';
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: (+PORT + 1),
    proxy: `http://localhost:${PORT}/`,
  })
);

module.exports = config;
