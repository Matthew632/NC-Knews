const { fetchArticles, postArticle } = require('../models/articles');

function getArticles(req, res, next) {
  fetchArticles().then((fetchedArticles) => {
    res.status(200).send({ articles: fetchedArticles });
  });
}

function insertArticle(req, res, next) {
  postArticle(req.body).then((postedArticle) => {
    res.status(201).send({ articles: postedArticle });
  });
}

module.exports = { getArticles, insertArticle };
