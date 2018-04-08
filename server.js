const express = require('express');
const router = require('express').Router();
const path = require('path');
var serveStatic = require('serve-static');

const app = express();

app.use(serveStatic(path.join(__dirname, 'node_modules')))
router.get('/todo.json', (req, res, next) => {
    const options = {
        root: __dirname + '/src',
      };
  res.sendFile('/todo.json', options, (err) => {
    if (err) next(err);
  });
});

router.get('*', function(req, res, next) {
    const file = (!req.url.match(/(\.js)/) || req.url === '/') ?
    'app.html' :
    req.url.slice(1);

    const options = {
        root: __dirname + '/src',
      };

    res.sendFile(file, options, function (err) {
      if (err) next(err);
    });
});

app.use(router);
app.listen(8000, () => console.log('Listening on port 8000'));
