process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');


describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET status:200 responds with an array of topic objects', () => request
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.topics).to.have.lengthOf(2);
        expect(response.body.topics[0]).to.contain.keys(
          'slug',
          'description',
        );
      }));
    it('POST status:201 responds with inserted object', () => request
      .post('/api/topics').send({ slug: 'test slug', description: 'example body text' })
      .expect(201)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.topics[0]).to.contain.keys(
          'slug',
          'description',
        );
      }));
  });
  describe('/articles', () => {
    it('GET status:200 responds with an array of article objects', () => request
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles).to.have.lengthOf(12);
        expect(response.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('check author query on articles', () => request
      .get('/api/articles?author=icellusedkars')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles).to.have.lengthOf(6);
        expect(response.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('check topic query on articles', () => request
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles).to.have.lengthOf(11);
        expect(response.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('check both author and topic query on articles', () => request
      .get('/api/articles?author=rogersop&topic=mitch')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles).to.have.lengthOf(2);
        expect(response.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('check sort_by and order on comment_count column', () => request
      .get('/api/articles?sort_by=comment_count&order=asc')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles).to.have.lengthOf(12);
        expect(response.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('check sort_by and order', () => request
      .get('/api/articles?sort_by=title&order=asc')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles).to.have.lengthOf(12);
        expect(response.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('POST status:201 responds with inserted article object', () => request
      .post('/api/articles').send({
        title: 'a title', body: 'some words', topic: 'mitch', username: 'icellusedkars',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles[0]).to.contain.keys(
          'article_id',
          'author',
          'created_at',
          'title',
          'topic',
          'votes',
          'body',
        );
      }));
    it('check specific article is returned', () => request
      .get('/api/articles/7')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.article).to.have.lengthOf(1);
        expect(response.body.article[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
        expect(response.body.article[0].title).to.eql('Z');
      }));
  });
});

// const request = supertest(app);
// describe("/api", () => {
//   describe("/treasures", () => {
//     it("responds with 200 status and the treasures", () => {
//       return request
//         .get("/api/treasures")
//         .expect(200)
//         .then(response => {
//           expect(response.body.treasures).to.be.an("array");
//           expect(response.body.treasures[0]).to.contain.keys(
//             "treasure_id",
//             "treasure_name",
//             "colour",
//             "age",
//             "shop_name",
//             "cost_at_auction"
//           );
//         });
//     });
// //     it("length defaults to 25", () => {
// //       return request
// //         .get("/api/treasures")
// //         .expect(200)
// //         .then(response => {
// //           expect(response.body.treasures).to.have.lengthOf(25);
// //         });
// //     });
// //     it("length can be set by passing additional parameter", () => {
// //       return request
// //         .get("/api/treasures?limit=5")
// //         .expect(200)
// //         .then(response => {
// //           expect(response.body.treasures).to.have.lengthOf(5);
// //         });
// //     });
// //     it("default sort criteria is cost_at_auction ascending", () => {
// //       return request
// //         .get("/api/treasures")
// //         .expect(200)
// //         .then(response => {
// //           expect(Number(response.body.treasures[0].cost_at_auction)).to.below(
// //             Number(response.body.treasures[1].cost_at_auction)
// //           );
// //           expect(Number(response.body.treasures[1].cost_at_auction)).to.below(
// //             Number(response.body.treasures[2].cost_at_auction)
// //           );
// //           expect(Number(response.body.treasures[2].cost_at_auction)).to.below(
// //             Number(response.body.treasures[3].cost_at_auction)
// //           );
// //         });
// //     });
// //     it("default sort criteria is cost_at_auction ascending", () => {
// //       return request
// //         .get("/api/treasures")
// //         .expect(200)
// //         .then(response => {
// //           expect(Number(response.body.treasures[0].cost_at_auction)).to.below(
// //             Number(response.body.treasures[1].cost_at_auction)
// //           );
// //           expect(Number(response.body.treasures[1].cost_at_auction)).to.below(
// //             Number(response.body.treasures[2].cost_at_auction)
// //           );
// //           expect(Number(response.body.treasures[2].cost_at_auction)).to.below(
// //             Number(response.body.treasures[3].cost_at_auction)
// //           );
// //         });
// //     });
// //     it("sort criteria can be set to age", () => {
// //       return request
// //         .get("/api/treasures?sortBy=age")
// //         .expect(200)
// //         .then(response => {
// //           expect(Number(response.body.treasures[0].age)).to.be.at.most(
// //             Number(response.body.treasures[1].age)
// //           );
// //           expect(Number(response.body.treasures[1].age)).to.be.at.most(
// //             Number(response.body.treasures[2].age)
// //           );
// //           expect(Number(response.body.treasures[2].age)).to.be.at.most(
// //             Number(response.body.treasures[3].age)
// //           );
// //         });
// //     });
// //     it("respond to queries", () => {
// //       return request
// //         .get("/api/treasures?colour=azure")
// //         .expect(200)
// //         .then(response => {
// //           expect(response.body.treasures[0].colour).to.equal("azure");
// //           // expect(Number(response.body.treasures[0].age).to.be.at.most(101));
// //           // expect(Number(response.body.treasures[0].age).to.be.at.least(99));
// //           // expect(
// //           //   Number(response.body.treasures[0].cost_at_auction).to.be.at.most(
// //           //     1002
// //           //   )
//           // );
//           // expect(
//           //   Number(response.body.treasures[0].cost_at_auction).to.be.at.least(
//           //     999
//           //  )
//           //  );
//         });
//     });
//   });
// });
