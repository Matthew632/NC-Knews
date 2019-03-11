const { expect } = require('chai');
const { createRef, formatArr, formatTreasures } = require('../utils/seed_utils.js');

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
  it('test if an new array of objects is created using a ref in the correct format', () => {
    const ref = { Augustus: 90, Trevion: 91 };
    const testShops = [{
      shop_name: 'Spinka - Zieme',
      owner: 'Augustus',
      slogan: 'Face to face analyzing complexity',
    },
    {
      shop_name: 'Spinka - Zieme',
      owner: 'Trevion',
      slogan: 'Face to face analyzing complexity',
    }];
    const result = [{
      owner_id: 90,
      shop_name: 'Spinka - Zieme',
      slogan: 'Face to face analyzing complexity',
    },
    {
      owner_id: 91,
      shop_name: 'Spinka - Zieme',
      slogan: 'Face to face analyzing complexity',
    }];
    expect(formatArr(testShops, ref)).to.eql(result);
  });
  it('test if an new array of objects is created using a ref in the correct tresure format', () => {
    const ref = { 'Wintheiser, Bogisich and Howell': 99 };
    const testTreasure = [{
      treasure_name: 'Open-source Intelligent Steel Ball',
      colour: 'indigo',
      age: 666,
      cost_at_auction: 36121,
      shop: 'Wintheiser, Bogisich and Howell',
    }];
    const result = [{
      treasure_name: 'Open-source Intelligent Steel Ball',
      colour: 'indigo',
      age: 666,
      cost_at_auction: 36121,
      shop_id: 99,
    }];
    expect(formatTreasures(testTreasure, ref)).to.eql(result);
  });
});
