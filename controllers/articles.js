const {
  fetchArticles, fetchArticle, postArticle, patchVotes, delArticle,
} = require('../models/articles');
const { checkTopic } = require('../models/topics');
const { fetchUser } = require('../models/users');


function getArticles(req, res, next) {
  let { sort_by } = req.query;
  const { order } = req.query;
  let { limit } = req.query;
  const { p } = req.query;
  const query = {}; let author = {}; let topic = {}; let page = 0;
  const columns = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count', 'body'];
  if (limit !== undefined && !/^(0|[1-9]\d*)$/.test(limit)) next({ code: 400, msg: 'Limit should be a postive integer' });
  if (p !== undefined && !/^(0|[1-9]\d*)$/.test(p)) next({ code: 400, msg: 'Page should be a postive integer' });
  if (limit === undefined) { limit = 10; }
  if (p !== undefined) { page = limit * (p - 1); }
  if (sort_by !== undefined && columns.every(col => sort_by !== col)) next({ code: 400, msg: 'Specified sort_by column does not exist' });
  if (order !== undefined && order !== 'asc' && order !== 'desc') next({ code: 400, msg: 'Order must be asc or desc' });
  if (req.query.author) { query['articles.author'] = req.query.author; author = { username: req.query.author }; }
  if (req.query.topic) { query['articles.topic'] = req.query.topic; topic = { slug: req.query.topic }; }
  if (sort_by !== undefined && sort_by !== 'comment_count') { sort_by = `articles.${sort_by}`; }

  Promise.all([fetchArticles(query, sort_by, order, limit, page), fetchUser(author), checkTopic(topic)])
    .then(([fetchedArticles, fetchedUser, fetchedTopic]) => {
      if (fetchedTopic.length === 0) next({ code: 404, msg: 'Topic not found' });
      else if (fetchedUser.length === 0) next({ code: 404, msg: 'Author not found' });
      else res.status(200).send({ articles: fetchedArticles });
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
    res.status(201).send({ article: postedArticle[0] });
  })
    .catch(next);
}

function patchArticle(req, res, next) {
  const { inc_votes } = req.body;
  if (!Number.isInteger(inc_votes)) next({ code: 400, msg: 'Votes must be an integer' });
  else {
    patchVotes(req.params, inc_votes).then((patchedArticle) => {
      res.status(200).send({ article: patchedArticle[0] });
    })
      .catch(next);
  }
}

function deleteArticle(req, res, next) {
  delArticle(req.params).then((deleteCount) => {
    if (deleteCount === 0) next({ code: 404, msg: 'Article not found' });
    else { res.sendStatus(204); }
  })
    .catch(next);
}

module.exports = {
  getArticles, getArticle, insertArticle, patchArticle, deleteArticle,
};
