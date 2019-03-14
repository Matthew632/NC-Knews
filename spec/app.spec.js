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
        expect(response.body.article[0]).to.contain.keys(
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
    it('check the patch to increment article votes', () => request
      .patch('/api/articles/7').send({ inc_votes: 4 })
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
          'body',
        );
        expect(response.body.article[0].votes).to.eql(4);
      }));
    it('check article delete', () => request
      .delete('/api/articles/7')
      .expect(204));
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
    it('GET status:404 responds with error message when request is made with a bad article ref', () => request
      .get('/api/articles/12345/comments')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).to.eql('Comments not found');
      }));
  });
  describe('400 errors', () => {
    it('GET status:404 responds with error message when request is made with a bad user', () => request
      .get('/api/articles/abc')
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
        expect(response.body.msg).to.eql('Bad Request');
      }));
  });
});
