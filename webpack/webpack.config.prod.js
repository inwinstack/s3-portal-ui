const webpack = require('webpack');
const config = require('./webpack.config.base');

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  })
);

module.exports = config;
