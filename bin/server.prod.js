/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, '../dist')));

app.use('/css', express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://0.0.0.0:${port}`);
});
