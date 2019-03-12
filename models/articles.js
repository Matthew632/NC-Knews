const connection = require('../db/connection');

const fetchArticles = () => connection
  .select('articles.article_id', 'articles.author', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
  .count('articles.article_id as comment_count')
  .from('articles')
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id');

const postArticles = req => connection
  .insert(req)
  .into('articles')
  .returning('*');

module.exports = { fetchArticles, postArticles };
