const { fetchComments, postComment } = require('../models/comments');

function getComments(req, res, next) {
  const { sort_by } = req.query;
  const { order } = req.query;
  fetchComments(req.params, sort_by, order).then((fetchedComments) => {
    console.log(fetchedComments);
    res.status(200).send({ comments: fetchedComments });
  });
}

function insertComment(req, res, next) {
  postComment(req.params, req.body).then((postedComment) => {
    res.status(201).send({ comment: postedComment });
  });
}

module.exports = {
  getComments, insertComment,
};
