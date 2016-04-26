/* eslint no-console:0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack/webpack.config.dev');

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/css', express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`The dev server are listening at http://0.0.0.0:${port}
Please wait for the first time of bundle that will
take a while. The browser will automatically open
with browser-sync when bundle completed.
(browser-sync will listening at http://0.0.0.0:${port + 1})`);
});
