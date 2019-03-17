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
    it('check query on articles with topic that does not exist returns object with empty array', () => request
      .post('/api/users').send({ username: 'steve123', avatar_url: 'www.example.com', name: 'steve' })
      .expect(201)
      .then((resp) => {
        request.get('/api/articles?topic=steve123')
          .then((response) => {
            expect(200);
            expect(response.body).to.be.an('object');
            expect(response.body.articles).to.have.lengthOf(0);
          });
      }));
    it('check query on articles with topic that does not exist returns object with empty array', () => request
      .post('/api/topics').send({ slug: 'snail', description: 'example body text' })
      .expect(201)
      .then(() => request
        .get('/api/articles?topic=snail')
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.articles).to.have.lengthOf(0);
        })));
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
        expect(response.body.article).to.contain.keys(
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
        expect(response.body.article).to.be.an('object');
        expect(response.body.article).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
        );
      }));
    it('check the patch to increment article votes', () => request
      .patch('/api/articles/7').send({ inc_votes: 4 })
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.article).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'body',
        );
        expect(response.body.article.votes).to.eql(4);
      }));
    it('check article delete', () => request
      .delete('/api/articles/7')
      .expect(204)
      .then(() => request
        .get('/api/articles')
        .expect(200))
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.articles).to.have.lengthOf(11);
      }));
  });
  describe('/articles/:article_id/comments', () => {
    it('GET status:200 responds with an array of comment objects', () => request
      .get('/api/articles/5/comments')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.comments).to.have.lengthOf(2);
        expect(response.body.comments[0]).to.contain.keys(
          'comment_id', 'votes', 'created_at', 'author', 'body',
        );
      }));
    it('check sort_by and order query on get comments', () => request
      .get('/api/articles/5/comments?sort_by=author&order=asc')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.comments).to.have.lengthOf(2);
        expect(response.body.comments[0]).to.contain.keys(
          'comment_id', 'votes', 'created_at', 'author', 'body',
        );
      }));
    it('GET status:404 responds with error message when request is made with a bad article ref', () => request
      .get('/api/articles/3/comments')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.comments).to.have.lengthOf(0);
      }));
    it('POST status:201 responds with inserted comment object', () => request
      .post('/api/articles/5/comments').send({
        username: 'icellusedkars', body: 'some words',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.comment[0]).to.contain.keys(
          'article_id',
          'author',
          'created_at',
          'comment_id',
          'votes',
          'body',
        );
      }));
    it('PATCH status:200 responds with patched comment object', () => request
      .patch('/api/comments/1').send({ inc_votes: -2 })
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.comment[0]).to.contain.keys(
          'article_id',
          'author',
          'created_at',
          'comment_id',
          'votes',
          'body',
        );
        expect(response.body.comment[0].votes).to.eql(14);
      }));
    it('check comment delete', () => request
      .delete('/api/comments/2')
      .expect(204));
  });
  describe('/users', () => {
    it('GET status:200 responds with an array of user objects', () => request
      .get('/api/users')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.users).to.have.lengthOf(3);
        expect(response.body.users[0]).to.contain.keys(
          'username',
          'avatar_url',
          'name',
        );
      }));
    it('POST status:201 responds with inserted user object', () => request
      .post('/api/users').send({ username: 'steve123', avatar_url: 'www.example.com', name: 'steve' })
      .expect(201)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.user[0]).to.contain.keys(
          'username',
          'avatar_url',
          'name',
        );
        expect(response.body.user[0].name).to.eql('steve');
      }));
    it('GET status:200 responds with specific user objects', () => request
      .get('/api/users/icellusedkars')
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.user[0]).to.contain.keys(
          'username',
          'avatar_url',
          'name',
        );
        expect(response.body.user[0].name).to.eql('sam');
      }));
  });
  describe('error handling', () => {
    describe('non valid route', () => {
      it('GET status:404 responds with error message when route is invalid', () => request
        .get('/badroute')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.eql('Route not found');
        }));
    });
    describe('404 valid get requests for records that do not exist', () => {
      it('GET status:404 responds with error message when request is made with a bad user', () => request
        .get('/api/users/abc')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.eql('User not found');
        }));
      it('GET status:404 responds with error message when request is made with a bad article', () => request
        .get('/api/articles/12345')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.eql('Article not found');
        }));
      it('GET status:404 responds with error message when comments are requested for a valid but non-existing article', () => request
        .get('/api/articles/12345/comments')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.eql('Article not found');
        }));
      it('GET status:404 responds with error message on unavaliable route', () => request
        .get('/api/asdfghjkl')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.eql('Route not found');
        }));
      it('GET status: 404 responds with message if author does not exist', () => request
        .get('/api/articles?author=zzzzzz')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.eql('Author not found');
        }));
      it('GET status: 404 responds with message if topic does not exist', () => request
        .get('/api/articles?topic=zzzzzz')
        .expect(404)
        .then((response) => {
          expect(response.body.msg).to.eql('Topic not found');
        }));
    });
    describe('400 errors', () => {
      it('PATCH status:400 rejects non integer passed to votes on comments', () => request
        .patch('/api/comments/7').send({ inc_votes: 'zzz' })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Votes must be an integer');
        }));
      it('PATCH status:400 rejects non integer passed to votes on articles', () => request
        .patch('/api/articles/2').send({ inc_votes: 'bbb' })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Votes must be an integer');
        }));
      it('GET status:400 responds with error message when invalid sort_by column is requested', () => request
        .get('/api/articles?sort_by=zzzzzz')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Specified sort_by column does not exist');
        }));
      it('GET status:400 responds with error message when invalid order is requested', () => request
        .get('/api/articles?order=zzz')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Order must be asc or desc');
        }));
      it('GET status:400 responds with error message when request is made with string rather than integer', () => request
        .get('/api/articles/abc')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Bad Request');
        }));
      it('POST status:400 responds with error message when post request is missing required key', () => request
        .post('/api/topics').send({ description: 'example body text' })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Bad Request');
        }));
      it('POST status:400 responds with error message when post request is missing required key', () => request
        .post('/api/topics').send({ slug: 'example body text' })
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Bad Request');
        }));
      it('GET status:400 responds when comments with an invalid article id are requested', () => request
        .get('/api/articles/zzzzzz/comments')
        .expect(400)
        .then((response) => {
          expect(response.body.msg).to.eql('Bad Request');
        }));
    });
    describe('422 errors', () => {
      it('POST status:422 responds with error message when dupliacte listing is posted', () => request
        .post('/api/users').send({ username: 'icellusedkars', avatar_url: 'www.example.com', name: 'steve' })
        .expect(422)
        .then((response) => {
          expect(response.body.msg).to.eql('Unprocessable entity');
        }));
      it('POST status:422 responds with error message when dupliacte slug is posted', () => request
        .post('/api/topics').send({ slug: 'mitch', description: 'some words' })
        .expect(422)
        .then((response) => {
          expect(response.body.msg).to.eql('Unprocessable entity');
        }));
    });
    describe('405 errors', () => {
      it('POST status:405 responds with error message when invalid method is attempted', () => request
        .patch('/api/topics')
        .expect(405)
        .then((response) => {
          expect(response.body.msg).to.eql('Method Not Allowed');
        }));
      it('POST status:405 responds with error message when invalid method is attempted', () => request
        .delete('/api/articles')
        .expect(405)
        .then((response) => {
          expect(response.body.msg).to.eql('Method Not Allowed');
        }));
      it('POST status:405 responds with error message when invalid method is attempted', () => request
        .post('/api/articles/2')
        .expect(405)
        .then((response) => {
          expect(response.body.msg).to.eql('Method Not Allowed');
        }));
    });
  });
});
