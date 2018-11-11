'use strict';

const superagent = require('superagent');
const { startServer, stopServer } = require('../lib/server');
const { pRemoveAccountMock, pCreateAccountMock } = require('./lib/mock-account');

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Auth Router Tests', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  describe('POST route /signup', () => {
    test('Should return a 200 status code and a TOKEN', () => {
      return superagent.post(`${API_URL}/signup`)
        .send({
          username: 'peffles',
          email: 'peffles@wyattiscool.com',
          password: 'qwerty123',
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });
    test('Should return a 400 status code when no name is sent', () => {
      return superagent.post(`${API_URL}/signup`)
        .send({})
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(400);
        });
    });
    test('Should return 409 status code due to duplicate name', () => { // eslint-disable-line
      return pCreateAccountMock()
        .then((mock) => {
          const mockAccount = {
            username: mock.request.username,
            email: mock.request.email,
            password: mock.request.password,
          };
          return superagent.post(`${API_URL}/signup`)
            .send(mockAccount);
        })
        .then(Promise.reject)
        .catch((err) => {
          expect(err.status).toEqual(409);
        });
    });
  });

  describe('GET /signin', () => {
    test('GET /signin Should return a 200 status code and TOKEN', () => {
      return pCreateAccountMock()
        .then((mock) => {
          return superagent.get(`${API_URL}/signin`)
            .auth(mock.request.username, mock.request.password);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });
  });
});
