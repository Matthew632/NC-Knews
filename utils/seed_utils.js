function createRef(ownersArr, key, value) {
    const refObj = {};
    ownersArr.forEach((owner) => {
        refObj[owner[key]] = owner[value];
    });
    return refObj;
}

// function formatArr(shopArr, ref) {
//   newArr = [];
//   shopArr.forEach((shop) => {
//     newArr.push({
//       shop_name: shop.shop_name,
//       owner_id: ref[shop.owner],
//       slogan: shop.slogan,
//     });
//   });
//   return newArr;
// }

// function formatTreasures(treasureArr, ref) {
//   newArr = [];
//   treasureArr.forEach((treasure) => {
//     newArr.push({
//       treasure_name: treasure.treasure_name,
//       colour: treasure.colour,
//       age: treasure.age,
//       cost_at_auction: treasure.cost_at_auction,
//       shop_id: ref[treasure.shop],
//     });
//   });
//   return newArr;
// }
module.exports = { createRef };
