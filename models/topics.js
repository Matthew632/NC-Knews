const connection = require('../db/connection');

const fetchTopics = () => (
  connection
    .select('*')
    .from('topics')
);

module.exports = fetchTopics;


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
