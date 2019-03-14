const apiRouter = require('express').Router();
const { getTopics, insertTopic } = require('../controllers/topics.js');
const {
  getArticles, getArticle, insertArticle, patchArticle, deleteArticle,
} = require('../controllers/articles.js');
const {
  getComments, insertComment, patchComment, deleteComment,
} = require('../controllers/comments.js');
const { getUsers, insertUser, getUser } = require('../controllers/users.js');
const { handle405 } = require('../errors.js');

apiRouter.route('/topics')
  .get(getTopics)
  .post(insertTopic)
  .all(handle405);

apiRouter.route('/articles/:article_id/comments')
  .get(getComments)
  .post(insertComment)
  .all(handle405);

apiRouter.route('/comments/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all(handle405);

apiRouter.route('/articles/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .delete(deleteArticle)
  .all(handle405);

apiRouter.route('/articles')
  .get(getArticles)
  .post(insertArticle)
  .all(handle405);

apiRouter.route('/users/:username')
  .get(getUser)
  .all(handle405);

apiRouter.route('/users')
  .get(getUsers)
  .post(insertUser)
  .all(handle405);


module.exports = apiRouter;
