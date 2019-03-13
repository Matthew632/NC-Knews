const { fetchArticles, fetchArticle, postArticle } = require('../models/articles');

function getArticles(req, res, next) {
  let { sort_by } = req.query;
  const { order } = req.query;
  const query = {};
  console.log('this is the article id:', req.params);
  if (req.query.author) { query['articles.author'] = req.query.author; }
  if (req.query.topic) { query['articles.topic'] = req.query.topic; }
  if (sort_by !== undefined && sort_by !== 'comment_count') { sort_by = `articles.${sort_by}`; }

  fetchArticles(query, sort_by, order).then((fetchedArticles) => {
    res.status(200).send({ articles: fetchedArticles });
  });
}

function getArticle(req, res, next) {
  const params = { 'articles.article_id': req.params.article_id };
  fetchArticle(params).then((fetchedArticle) => {
    res.status(200).send({ article: fetchedArticle });
  });
}

function insertArticle(req, res, next) {
  const insertArt = {
    title: req.body.title, body: req.body.body, topic: req.body.topic, author: req.body.username,
  };
  postArticle(insertArt).then((postedArticle) => {
    res.status(201).send({ articles: postedArticle });
  });
}

module.exports = { getArticles, getArticle, insertArticle };
