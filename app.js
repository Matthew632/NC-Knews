const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./router/apiRouter.js');
const {
  handle400, handle404, handle500, handleAll,
} = require('./errors');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', handleAll);

app.use(handle400);
app.use(handle404);
app.use(handle500);

module.exports = app;
