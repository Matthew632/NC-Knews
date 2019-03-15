const {
  fetchComments, postComment, amendVotes, delComment,
} = require('../models/comments');
const { fetchArticle } = require('../models/articles');

function getComments(req, res, next) {
  const { sort_by } = req.query;
  const { order } = req.query;
  Promise.all([fetchComments(req.params, sort_by, order), fetchArticle({ 'articles.article_id': req.params.article_id })])
    .then(([fetchedComments, fetchedArticle]) => {
      if (fetchedArticle.length === 0) next({ code: 404, msg: 'Article not found' });
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
