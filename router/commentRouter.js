const commentRouter = require('express').Router();
const { patchComment, deleteComment } = require('../controllers/comments.js');
const { handle405 } = require('../errors.js');

commentRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all(handle405);

module.exports = commentRouter;
