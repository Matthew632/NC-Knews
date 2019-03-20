const userRouter = require('express').Router();
const { getUsers, insertUser, getUser } = require('../controllers/users.js');
const { handle405 } = require('../errors.js');

userRouter.route('/:username')
  .get(getUser)
  .all(handle405);

userRouter.route('')
  .get(getUsers)
  .post(insertUser)
  .all(handle405);

module.exports = userRouter;
