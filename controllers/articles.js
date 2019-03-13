const { fetchArticles, postArticle } = require('../models/articles');

function getArticles(req, res, next) {
  let { sort_by } = req.query;
  const { order } = req.query;
  const query = {};
  if (req.query.author) { query['articles.author'] = req.query.author; }
  if (req.query.topic) { query['articles.topic'] = req.query.topic; }
  if (sort_by !== undefined && sort_by !== 'comment_count') { sort_by = `articles.${sort_by}`; }

  fetchArticles(query, sort_by, order).then((fetchedArticles) => {
    console.log(fetchedArticles);
    res.status(200).send({ articles: fetchedArticles });
  });
}

function insertArticle(req, res, next) {
  const insertArt = {
    title: req.body.title, body: req.body.body, topic: req.body.topic, author: req.body.username,
  };
  console.log('this is the insert object:', insertArt);
  postArticle(insertArt).then((postedArticle) => {
    res.status(201).send({ articles: postedArticle });
  });
}

module.exports = { getArticles, insertArticle };
