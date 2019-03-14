const {
  fetchComments, postComment, amendVotes, delComment,
} = require('../models/comments');

function getComments(req, res, next) {
  const { sort_by } = req.query;
  const { order } = req.query;
  fetchComments(req.params, sort_by, order).then((fetchedComments) => {
    if (fetchedComments.length === 0) next({ code: 404, msg: 'Comments not found' });
    res.status(200).send({ comments: fetchedComments });
  })
    .catch(next);
}

function insertComment(req, res, next) {
  const newComment = {
    author: req.body.username,
    body: req.body.body,
    article_id: req.params.article_id,
  };
  postComment(newComment).then((postedComment) => {
    res.status(201).send({ comment: postedComment });
  })
    .catch(next);
}

function patchComment(req, res, next) {
  const { inc_votes } = req.body;
  amendVotes(req.params, inc_votes).then((patchedComment) => {
    res.status(200).send({ comment: patchedComment });
  })
    .catch(next);
}

function deleteComment(req, res, next) {
  delComment(req.params).then(() => {
    res.sendStatus(204);
  })
    .catch(next);
}

module.exports = {
  getComments, insertComment, patchComment, deleteComment,
};
