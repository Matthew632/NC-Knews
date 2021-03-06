const connection = require('../db/connection');

const fetchTopics = () => connection
  .select('*')
  .from('topics');

const checkTopic = topic => connection
  .select('*')
  .from('topics')
  .where(topic)
  .returning('*');

const postTopic = req => connection
  .insert(req)
  .into('topics')
  .returning('*');

module.exports = { fetchTopics, postTopic, checkTopic };
