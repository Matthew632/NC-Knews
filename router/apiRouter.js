const apiRouter = require('express').Router();
const { getTopics, insertTopic } = require('../controllers/topics.js');

apiRouter.route('/topics')
  .get(getTopics)
  .post(insertTopic);

module.exports = apiRouter;
