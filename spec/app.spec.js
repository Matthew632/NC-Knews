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
  });
});
