const request = require('supertest');
const app = require('../src/index'); // Adjust the path if necessary
const { expect } = require('chai');

describe('User API', () => {
  it('should create a new user', (done) => {
    request(app)
      .post('/users')
      .send({ id: '1', name: 'John Doe' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('OK');
        done();
      });
  });

  // Add more tests for GET, PUT, DELETE, and health check
});