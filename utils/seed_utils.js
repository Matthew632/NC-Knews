function formatDate(objArr) {
  return objArr.reduce((acc, obj) => {
    const newObj = obj;
    const d = new Date(newObj.created_at);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const r = `${year}-${month}-${day}`;
    newObj.created_at = r;
    acc.push(newObj);
    return acc;
  }, []);
}

function createRef(ownersArr, key, value) {
  const refObj = {};
  ownersArr.forEach((owner) => {
    refObj[owner[key]] = owner[value];
  });
  return refObj;
}

function formatComments(commentsArr, articleRef) {
  newArr = [];
  commentsArr.forEach(((comment) => {
    newArr.push({
      author: comment.created_by,
      article_id: articleRef[comment.belongs_to],
      votes: comment.votes,
      created_at: comment.created_at,
      body: comment.body,
    });
  }));
  return newArr;
}

// function formatArr(shopArr, ref) {
//   newArr = [];
//   shopArr.forEach((shop) => {
//     newArr.push({
//       'shop_name': shop.shop_name,
//       'owner_id': ref[shop.owner],
//       'slogan': shop.slogan
//     });
//   });
//   return newArr;
// };

// function formatArr(shopArr, ref) {
//   newArr = [];
//   shopArr.forEach((shop) => {
//       newArr.push({
//           'shop_name': shop.shop_name,
//           'owner_id': ref[shop.owner],
//           'slogan': shop.slogan
//       });
//   });
//   return newArr;
// };

// function formatTreasures(treasureArr, ref) {
//   newArr = [];
//   treasureArr.forEach((treasure) => {
//       newArr.push({
//           "treasure_name": treasure.treasure_name,
//           "colour": treasure.colour,
//           "age": treasure.age,
//           "cost_at_auction": treasure.cost_at_auction,
//           "shop_id": ref[treasure.shop]
//       })
//   })
//   return newArr;

module.exports = { createRef, formatDate, formatComments };
