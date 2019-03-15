const connection = require('../db/connection');

const fetchTopics = () => connection
  .select('*')
  .from('topics');

const checkTopic = top => connection
  .select('*')
  .from('topics')
  .where({ slug: top })
  .returning('*');

const postTopic = req => connection
  .insert(req)
  .into('topics')
  .returning('*');

module.exports = { fetchTopics, postTopic, checkTopic };
