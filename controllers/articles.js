const {
  fetchArticles, fetchArticle, postArticle, patchVotes, delArticle,
} = require('../models/articles');

function getArticles(req, res, next) {
  let { sort_by } = req.query;
  const { order } = req.query;
  const query = {};
  if (req.query.author) { query['articles.author'] = req.query.author; }
  if (req.query.topic) { query['articles.topic'] = req.query.topic; }
  if (sort_by !== undefined && sort_by !== 'comment_count') { sort_by = `articles.${sort_by}`; }

  fetchArticles(query, sort_by, order).then((fetchedArticles) => {
    res.status(200).send({ articles: fetchedArticles });
  })
    .catch(next);
}

function getArticle(req, res, next) {
  const params = { 'articles.article_id': req.params.article_id };
  fetchArticle(params).then((fetchedArticle) => {
    if (fetchedArticle.length === 0) next({ code: 404, msg: 'Article not found' });
    res.status(200).send({ article: fetchedArticle });
  })
    .catch(next);
}

function insertArticle(req, res, next) {
  const insertArt = {
    title: req.body.title, body: req.body.body, topic: req.body.topic, author: req.body.username,
  };
  postArticle(insertArt).then((postedArticle) => {
    res.status(201).send({ article: postedArticle });
  })
    .catch(next);
}

function patchArticle(req, res, next) {
  const { inc_votes } = req.body;
  patchVotes(req.params, inc_votes).then((patchedArticle) => {
    res.status(200).send({ article: patchedArticle });
  })
    .catch(next);
}

function deleteArticle(req, res, next) {
  delArticle(req.params).then(() => {
    res.sendStatus(204);
  })
    .catch(next);
}

module.exports = {
  getArticles, getArticle, insertArticle, patchArticle, deleteArticle,
};
