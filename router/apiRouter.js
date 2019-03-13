const apiRouter = require('express').Router();
const { getTopics, insertTopic } = require('../controllers/topics.js');
const { getArticles, getArticle, insertArticle } = require('../controllers/articles.js');

apiRouter.route('/topics')
  .get(getTopics)
  .post(insertTopic);

apiRouter.route('/articles/:article_id')
  .get(getArticle);

apiRouter.route('/articles')
  .get(getArticles)
  .post(insertArticle);


module.exports = apiRouter;
