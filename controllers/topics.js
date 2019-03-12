const { fetchTopics, postTopic } = require('../models/topics');

function getTopics(req, res, next) {
  fetchTopics().then((fetchedTopics) => {
    res.status(200).send({ topics: fetchedTopics });
  });
}

function insertTopic(req, res, next) {
  postTopic(req.body).then((postedTopic) => {
    console.log('you are in the controller', postedTopic[0]);
    res.status(201).send({ topics: postedTopic });
  });
}

module.exports = { getTopics, insertTopic };
