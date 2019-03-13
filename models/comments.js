const connection = require('../db/connection');

const fetchComments = (params, sort_by = 'comment_id', order = 'desc') => connection
  .select('comment_id', 'votes', 'created_at', 'author', 'body')
  .from('comments')
  .where(params)
  .orderBy(sort_by, order);

const postComment = () => { };

module.exports = { fetchComments, postComment };
