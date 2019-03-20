const articleRouter = require('express').Router();
const {
  getArticles, getArticle, insertArticle, patchArticle, deleteArticle,
} = require('../controllers/articles.js');
const { getComments, insertComment } = require('../controllers/comments.js');
const { handle405 } = require('../errors.js');

articleRouter.route('/:article_id/comments')
  .get(getComments)
  .post(insertComment)
  .all(handle405);

articleRouter.route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .delete(deleteArticle)
  .all(handle405);

articleRouter.route('')
  .get(getArticles)
  .post(insertArticle)
  .all(handle405);

module.exports = articleRouter;
