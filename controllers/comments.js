const { fetchComments, postComment } = require('../models/comments');

function getComments(req, res, next) {
  const { sort_by } = req.query;
  const { order } = req.query;
  fetchComments(req.params, sort_by, order).then((fetchedComments) => {
    res.status(200).send({ comments: fetchedComments });
  });
}

function insertComment(req, res, next) {
  const newComment = {
    author: req.body.username,
    body: req.body.body,
    article_id: req.params.article_id,
  };
  console.log('this is the comments:', newComment);
  postComment(newComment).then((postedComment) => {
    res.status(201).send({ comment: postedComment });
  });
}

module.exports = {
  getComments, insertComment,
};
