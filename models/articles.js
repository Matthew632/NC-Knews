const connection = require('../db/connection');

const fetchArticles = (query, sort_by = 'articles.article_id', order = 'desc') => connection
  .select('articles.article_id', 'articles.author', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
  .count('comments.article_id as comment_count')
  .from('articles')
  .where(query)
  .orderBy(sort_by, order)
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id');

const fetchArticle = params => connection
  .select('articles.article_id', 'articles.author', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
  .count('comments.article_id as comment_count')
  .from('articles')
  .where(params)
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id');

const postArticle = req => connection
  .insert(req)
  .into('articles')
  .returning('*');

const patchVotes = (article_id, votes) => connection
  .select('*')
  .from('articles')
  .where(article_id)
  .increment('votes', votes)
  .returning('*');

module.exports = {
  fetchArticles, fetchArticle, postArticle, patchVotes,
};
