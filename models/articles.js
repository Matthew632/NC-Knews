const connection = require('../db/connection');

const fetchArticles = (query, sort_by = 'articles.article_id', order = 'desc') => connection
  .select('articles.article_id', 'articles.author', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
  .count('comments.article_id as comment_count')
  .from('articles')
  .where(query)
  .orderBy(sort_by, order)
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id');

const postArticle = (req) => {
  console.log('this is in the model', req);
  return connection
    .insert(req)
    .into('articles')
    .returning('*');
};

module.exports = { fetchArticles, postArticle };
