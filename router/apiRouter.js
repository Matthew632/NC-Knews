const apiRouter = require('express').Router();
const { getTopics, insertTopic } = require('../controllers/topics.js');
const {
  getArticles, getArticle, insertArticle, patchArticle, deleteArticle,
} = require('../controllers/articles.js');
const {
  getComments, insertComment, patchComment, deleteComment,
} = require('../controllers/comments.js');
const { getUsers, insertUser, getUser } = require('../controllers/users.js');

apiRouter.route('/topics')
  .get(getTopics)
  .post(insertTopic);

apiRouter.route('/articles/:article_id/comments')
  .get(getComments)
  .post(insertComment);

apiRouter.route('/comments/:comment_id')
  .patch(patchComment)
  .delete(deleteComment);

apiRouter.route('/articles/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .delete(deleteArticle);

apiRouter.route('/articles')
  .get(getArticles)
  .post(insertArticle);

apiRouter.route('/users/:username')
  .get(getUser);

apiRouter.route('/users')
  .get(getUsers)
  .post(insertUser);


module.exports = apiRouter;
