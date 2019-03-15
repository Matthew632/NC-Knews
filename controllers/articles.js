const {
  fetchArticles, fetchArticle, postArticle, patchVotes, delArticle,
} = require('../models/articles');
const { checkTopic } = require('../models/topics');
const { fetchUser } = require('../models/users');


function getArticles(req, res, next) {
  let { sort_by } = req.query;
  const { order } = req.query;
  const query = {}; let author = {}; let topic = {};
  const columns = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'];
  if (sort_by !== undefined && columns.every(col => sort_by !== col)) next({ code: 400, msg: 'Specified sort_by column does not exist' });
  if (order !== undefined && order !== 'asc' && order !== 'desc') next({ code: 400, msg: 'Order must be asc or desc' });
  if (req.query.author) { query['articles.author'] = req.query.author; author = { username: req.query.author }; }
  if (req.query.topic) { query['articles.topic'] = req.query.topic; topic = { slug: req.query.topic }; }
  if (sort_by !== undefined && sort_by !== 'comment_count') { sort_by = `articles.${sort_by}`; }

  Promise.all([fetchArticles(query, sort_by, order), fetchUser(author), checkTopic(topic)])
    .then(([fetchedArticles, fetchedUser, fetchedTopic]) => {
      if (fetchedTopic.length === 0) next({ code: 404, msg: 'Topic not found' });
      if (fetchedUser.length === 0) next({ code: 404, msg: 'Author not found' });
      res.status(200).send({ articles: fetchedArticles });
    })
    .catch(next);
}

function getArticle(req, res, next) {
  const params = { 'articles.article_id': req.params.article_id };
  fetchArticle(params).then((fetchedArticle) => {
    if (fetchedArticle.length === 0) next({ code: 404, msg: 'Article not found' });
    res.status(200).send({ article: fetchedArticle[0] });
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
