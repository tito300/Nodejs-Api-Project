const request = require('supertest');
const mongoose = require('mongoose');

let server;

describe.only('server', () => {
  afterAll(() => server.close());
  describe('development db should not connect when testing', () => {
    it('connection should be 0', async () => {
      //   request(require('../../bin/www')).emit('clientError'));
      server = await require('../../bin/www'); // eslint-disable-line
      return expect(mongoose.connection._readyState).toBe(0);
    });
  });
  describe('should start listening', () => {
    it('should listen to env port', async () => {
      server = await require('../../bin/www'); // eslint-disable-line
      return expect(server.listening).toBeTruthy;
    });
  });
});
