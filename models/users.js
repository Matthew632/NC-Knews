const connection = require('../db/connection');

const fetchUsers = () => connection
  .select('*')
  .from('users')
  .returning('*');


const fetchUser = params => connection
  .select('*')
  .from('users')
  .where(params)
  .returning('*');

const postUser = req => connection
  .insert(req)
  .into('users')
  .returning('*');

module.exports = { fetchUsers, fetchUser, postUser };
