const { expect } = require('chai');
const { createRef, formatDate } = require('../utils/seed_utils.js');

describe('createRef', () => {
  it('test if a reference object is created from owner array', () => {
    const testOwnerArr = [{
      owner_id: 90, forename: 'Augustus', surname: 'Stark', age: 106,
    },
    {
      owner_id: 91, forename: 'Trevion', surname: 'Denesik', age: 28,
    }];
    const result = { Augustus: 90, Trevion: 91 };
    expect(createRef(testOwnerArr, 'forename', 'owner_id')).to.eql(result);
  });
  it('test if a reference object is created from shop array', () => {
    const testShopArr = [{
      shop_id: 99,
      shop_name: 'Wintheiser, Bogisich and Howell',
      owner_id: 82,
      slogan: 'Pre-emptive interactive customer loyalty',
    },
    {
      shop_id: 100,
      shop_name: 'Ratke, Marvin and Gorczany',
      owner_id: 34,
      slogan: 'Integrated full-range internet solution',
    }];
    const result = { 'Wintheiser, Bogisich and Howell': 99, 'Ratke, Marvin and Gorczany': 100 };
    expect(createRef(testShopArr, 'shop_name', 'shop_id')).to.eql(result);
  });
});

describe('formatDate', () => {
  it('test if a reference object is created from owner array', () => {
    const testArticles = [{
      title: 'Running a Node App',
      topic: 'coding',
      author: 'jessjelly',
      body:
        'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      created_at: 1471522072389,
    },
    {
      title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
      topic: 'coding',
      author: 'jessjelly',
      body:
        'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
      created_at: 1500584273256,
    }];
    const result = [{
      title: 'Running a Node App',
      topic: 'coding',
      author: 'jessjelly',
      body:
        'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      created_at: '2016-08-18',
    },
    {
      title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
      topic: 'coding',
      author: 'jessjelly',
      body:
        'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
      created_at: '2017-07-20',
    }];
    expect(formatDate(testArticles)).to.eql(result);
  });
});
