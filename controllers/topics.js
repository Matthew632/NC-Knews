// const fetchTopics = require("../models/topics");

function getTopics(req, res, next) {
  console.log('you are in the controller');
  res.status(200).send([{ test: 'testing' }, { tests: 'testings' }]);
}

module.exports = getTopics;

// const fetchTreasures = require("../models/treasures");

// const getTreasures = (req, res, next) => {
//     const { limit } = req.query.limit;
//     console.log('this is the limit:', limit);
//     fetchTreasures(limit, sortBy, colour).then(fetchedTreasures => {
//         res.status(200).send({ treasures: fetchedTreasures });
//     });
// };

// module.exports = getTreasures;
