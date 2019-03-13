const { fetchUsers, fetchUser, postUser } = require('../models/users');


function getUsers(req, res, next) {
  fetchUsers().then((fetchedUsers) => {
    res.status(200).send({ users: fetchedUsers });
  });
}

function getUser(req, res, next) {
  fetchUser(req.params).then((fetchedUser) => {
    res.status(200).send({ user: fetchedUser });
  });
}

function insertUser(req, res, next) {
  postUser(req.body).then((postedUser) => {
    res.status(201).send({ user: postedUser });
  });
}


module.exports = { getUsers, insertUser, getUser };
