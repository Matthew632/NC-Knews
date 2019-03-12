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
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(2);
        expect(response.body[0]).to.contain.keys(
          'slug',
          'description',
        );
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
