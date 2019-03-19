const { fetchUsers, fetchUser, postUser } = require('../models/users');


function getUsers(req, res, next) {
  fetchUsers().then((fetchedUsers) => {
    res.status(200).send({ users: fetchedUsers });
  })
    .catch(next);
}

function getUser(req, res, next) {
  fetchUser(req.params).then((fetchedUser) => {
    if (fetchedUser.length === 0) next({ code: 404, msg: 'User not found' });
    else res.status(200).send({ user: fetchedUser[0] });
  })
    .catch(next);
}

function insertUser(req, res, next) {
  postUser(req.body).then((postedUser) => {
    res.status(201).send({ user: postedUser[0] });
  })
    .catch(next);
}


module.exports = { getUsers, insertUser, getUser };
