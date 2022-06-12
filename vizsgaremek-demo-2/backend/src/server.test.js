const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const Product = require('./model/product');
const { response } = require('jest-mock-req-res');
const { Test } = require('supertest');

describe('REST API integration tests', () => {
  // az összes teszteset előtt lefuttaja
  beforeEach(done => {
    const { host, user, pass } = config.get('database');
    mongoose.connect(`mongodb+srv://${host}`, {
      user,
      pass,
    }).then(conn => {
      console.log('Connection success!');
      // mehet tovább
      done();
    })
      .catch(err => {
        throw new Error(err.message);
      });
  });

  afterEach(done => {
    mongoose.connection.close(() => done());
  });

  test('GET /product', done => {
    // http kérés a product url-re
    // vizsgálja, hogy helyes-e a válaszkód 200-as, vagyis sikeres?
    supertest(app).get('/product').expect(200)
      .then(response => {
        // a válasz body-ja tömb?
        expect(Array.isArray(response.body)).toBeTruthy();
        done();
      });
  });
});