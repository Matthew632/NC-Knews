const apiRouter = require('express').Router();
const { getTopics, insertTopic } = require('../controllers/topics.js');
const {
  getArticles, getArticle, insertArticle, patchArticle, deleteArticle,
} = require('../controllers/articles.js');
const { getComments, insertComment } = require('../controllers/comments.js');

apiRouter.route('/topics')
  .get(getTopics)
  .post(insertTopic);

apiRouter.route('/articles/:article_id/comments')
  .get(getComments)
  .post(insertComment);

apiRouter.route('/articles/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .delete(deleteArticle);

apiRouter.route('/articles')
  .get(getArticles)
  .post(insertArticle);


module.exports = apiRouter;
