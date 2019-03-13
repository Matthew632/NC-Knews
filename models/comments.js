const connection = require('../db/connection');

const fetchComments = (params, sort_by = 'comment_id', order = 'desc') => connection
  .select('comment_id', 'votes', 'created_at', 'author', 'body')
  .from('comments')
  .where(params)
  .orderBy(sort_by, order);

const postComment = newComment => connection
  .insert(newComment)
  .into('comments')
  .returning('*');

module.exports = { fetchComments, postComment };
