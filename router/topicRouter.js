const topicRouter = require('express').Router();
const { getTopics, insertTopic } = require('../controllers/topics.js');
const { handle405 } = require('../errors.js');

topicRouter.route('')
  .get(getTopics)
  .post(insertTopic)
  .all(handle405);

module.exports = topicRouter;
