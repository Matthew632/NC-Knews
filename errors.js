function handle400(err, req, res, next) {
  const codes = {
    23502: 'violates not null violation',
    '22P02': 'invalid input syntax for type integer',
  };
  if (codes[err.code]) res.status(400).send({ msg: 'Bad Request' });
  if (err.code === 400) res.status(400).send({ msg: err.msg });
  else next(err);
}

function handle404(err, req, res, next) {
  if (err.code === 404) res.status(404).send({ msg: err.msg });
  else next(err);
}

// this is not error handling middleware, just regular middleware
function handle405(req, res, next) {
  res.status(405).send({ msg: 'Method Not Allowed' });
}

function handle422(err, req, res, next) {
  if (err.code === '23505') res.status(422).send({ msg: 'Unprocessable entity' });
  else next(err);
}

function handle500(err, req, res, next) {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
}

module.exports = {
  handle400, handle404, handle405, handle422, handle500,
};
