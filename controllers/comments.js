const {
  fetchComments,
  postComment,
  amendVotes,
  delComment,
} = require('../models/comments');
const { fetchArticle } = require('../models/articles');

function getComments(req, res, next) {
  const { sort_by } = req.query;
  const { order } = req.query;
  let { limit } = req.query;
  const { p } = req.query;
  let page = 0;
  const columns = ['comment_id', 'votes', 'created_at', 'author', 'body'];
  if (limit !== undefined && !/^(0|[1-9]\d*)$/.test(limit)) next({ code: 400, msg: 'Limit should be a postive integer' });
  if (p !== undefined && !/^(0|[1-9]\d*)$/.test(p)) next({ code: 400, msg: 'Page should be a postive integer' });
  if (limit === undefined) {
    limit = 10;
  }
  if (p !== undefined) {
    page = limit * (p - 1);
  }
  if (sort_by !== undefined && columns.every(col => sort_by !== col)) next({ code: 400, msg: 'Specified sort_by column does not exist' });
  if (order !== undefined && order !== 'asc' && order !== 'desc') next({ code: 400, msg: 'Order must be asc or desc' });
  Promise.all([
    fetchComments(req.params, sort_by, order, limit, page),
    fetchArticle({ 'articles.article_id': req.params.article_id }),
    fetchComments(req.params, sort_by, order),
  ])
    .then(([fetchedComments, fetchedArticle, commentCount]) => {
      if (fetchedArticle.length === 0) next({ code: 404, msg: 'Article not found' });
      res
        .status(200)
        .send({ comments: fetchedComments, total_count: commentCount.length });
    })
    .catch(next);
}

function insertComment(req, res, next) {
  const newComment = {
    author: req.body.username,
    body: req.body.body,
    article_id: req.params.article_id,
  };
  postComment(newComment)
    .then((postedComment) => {
      res.status(201).send({ comment: postedComment[0] });
    })
    .catch(next);
}

function patchComment(req, res, next) {
  const { inc_votes } = req.body;
  if (!Number.isInteger(inc_votes)) next({ code: 400, msg: 'Votes must be an integer' });
  else {
    amendVotes(req.params, inc_votes)
      .then((patchedComment) => {
        res.status(200).send({ comment: patchedComment[0] });
      })

      .catch(next);
  }
}

function deleteComment(req, res, next) {
  delComment(req.params)
    .then((deleteCount) => {
      if (deleteCount === 0) next({ code: 404, msg: 'Comment not found' });
      else {
        res.sendStatus(204);
      }
    })
    .catch(next);
}

module.exports = {
  getComments,
  insertComment,
  patchComment,
  deleteComment,
};
