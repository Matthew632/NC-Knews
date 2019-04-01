const connection = require('../db/connection');

const fetchComments = (params, sort_by = 'comment_id', order = 'desc', limit, page) => connection
  .select('comment_id', 'votes', 'created_at', 'author', 'body')
  .from('comments')
  .where(params)
  .orderBy(sort_by, order)
  .limit(limit)
  .offset(page);

const postComment = newComment => connection
  .insert(newComment)
  .into('comments')
  .returning('*');

const amendVotes = (comment_id, votes) => connection
  .select('*')
  .from('comments')
  .where(comment_id)
  .increment('votes', votes)
  .returning('*');

const delComment = comment_id => connection
  .select('*')
  .from('comments')
  .where(comment_id)
  .del();

module.exports = {
  fetchComments, postComment, amendVotes, delComment,
};
