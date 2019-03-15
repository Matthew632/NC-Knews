function formatDate(objArr) {
  return objArr.reduce((acc, obj) => {
    const newObj = { ...obj };
    const d = new Date(newObj.created_at);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const result = `${year}-${month}-${day}`;
    newObj.created_at = result;
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
  const newArr = [];
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

module.exports = { createRef, formatDate, formatComments };
