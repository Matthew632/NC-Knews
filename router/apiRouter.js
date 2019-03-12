const apiRouter = require('express').Router();
const getTopics = require('../controllers/topics.js');

apiRouter.route('/topics')
  .get(getTopics);

module.exports = apiRouter;
