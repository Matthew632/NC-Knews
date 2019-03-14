function handleAll(req, res, next) {
  res.status(404).send({ msg: 'Route not found' });
}

function handle400(err, req, res, next) {
  const codes = {
    23502: 'violates not null violation',
    '22P02': 'invalid input syntax for type integer',

  };
  if (codes[err.code]) res.status(400).send({ msg: 'Bad Request' });
  else next(err);
}

function handle404(err, req, res, next) {
  if (err.code === 404) res.status(404).send({ msg: err.msg });
  next(err);
}

function handle500(err, req, res, next) {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
}


module.exports = {
  handle400, handle404, handle500, handleAll,
};
