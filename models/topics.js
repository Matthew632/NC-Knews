const connection = require('../db/connection');

const fetchTopics = () => connection
  .select('*')
  .from('topics');

const postTopic = (req) => {
  console.log('you are in the model', req);
  return connection
    .insert(req)
    .into('topics')
    .returning('*');
};

module.exports = { fetchTopics, postTopic };


// const connection = require("../db/connection");

// const fetchTreasures = (
//     limit = 25,
//     sortBy = "cost_at_auction",
//     colour = "azure",
//     max_age,
//     min_age,
//     max_price,
//     min_price
// ) => {
//     return (
//         connection
//             .select(
//                 "treasure_id",
//                 "treasure_name",
//                 "colour",
//                 "age",
//                 "shop_name",
//                 "cost_at_auction"
//             )
//             .from("treasures")
//             .where("colour", "azure")
//             .join("shops", "treasures.shop_id", "=", "shops.shop_id")
//             .limit(limit)
//             // .whereBetween("cost_at_auction", [max_price, min_price])
//             // .whereBetween("age", [max_age, min_price])
//             .orderBy(sortBy, "asc")
//     );
// };

// module.exports = fetchTreasures;
