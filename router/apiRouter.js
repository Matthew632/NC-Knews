const apiRouter = require('express').Router();
const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const { handle405 } = require('../errors.js');

apiRouter.use('/topics', topicRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/articles', articleRouter);

apiRouter.use('/comments', commentRouter);

apiRouter.route('')
  .get((req, res, next) => {
    res.status(200).send('../endpoints.JSON');
  })
  .all(handle405);

module.exports = apiRouter;
