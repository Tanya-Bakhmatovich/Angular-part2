const express = require('express');
const router = require('express').Router();
const path = require('path');

const app = express();

app.use(express.static('dist'));
router.get('/todo.json', (req, res, next) => {
    const options = {
        root: __dirname + '/src/app',
      };
  res.sendFile('/todo.json', options, (err) => {
    if (err) next(err);
  });
});

app.use(router);
app.listen(8000);
