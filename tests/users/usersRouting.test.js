const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../users/userModel');
const { app } = require('../../app');

describe('Users routes ./users/..', () => {
  beforeAll(() => {
    if (process.env.NODE_ENV !== 'test') throw new Error('wrong environment');
    return mongoose.connect(
      'mongodb://localhost/test2345',
      { useCreateIndex: true }
    );
  });

  afterAll(() => mongoose.disconnect());

  describe('registration ./users/register', () => {
    beforeEach(() => {
      server = app.listen(3002);
    });
    afterEach(async () => {
      await User.deleteMany();
      server.close();
    });
    it('should return 400 on wrong name input', () =>
      request(server)
        .post('/users/register')
        .send({
          "name": 'ke', // eslint-disable-line
          "email": 'kellie@gmail.com', // eslint-disable-line
          "password": '12345', // eslint-disable-line
          "phone": '972-523-7199', // eslint-disable-line
        })
        .expect(400));
    it('should return 400 on wrong email input', () =>
      request(server)
        .post('/users/register')
        .send({
          "name": 'kellie', // eslint-disable-line
          "email": 'kel', // eslint-disable-line
          "password": '12345', // eslint-disable-line
          "phone": '972-523-7199', // eslint-disable-line
        })
        .expect(400));
    it('should return 200 on correct input', () =>
      request(server)
        .post('/users/register')
        .send({
          "name": 'kellie', // eslint-disable-line
          "email": 'kellie@gmail.com', // eslint-disable-line
          "password": '12345', // eslint-disable-line
          "phone": '972-523-7199', // eslint-disable-line
        })
        .expect(200)
        .expect('x-auth-token', /.*/));
  });
  describe('login ./login', async () => {
    beforeEach(() => {
      server = app.listen(3002);
    });
    afterEach(async () => {
      await User.deleteMany();
      server.close();
    });
    it('should return 404 on wrong login password', async () => {
      const newUser = new User({
        name: 'kellie',
        email: 'kellie@gmail.com',
        phone: '972-523-7199',
        password: '12345',
      });
      const saved = await newUser.save();
      const response = await request(server)
        .post('/users/login')
        .send({
          "email": 'kellie@gmail.com', // eslint-disable-line
          "password": 'wrong123', // eslint-disable-line
        });
      return expect(response.status).toBe(404);
    });
    it('should return 200 on correct login password', async () => {
      const salt = await bcrypt.genSalt(13);
      const hash = await bcrypt.hash('12345', salt);
      const newUser = new User({
        name: 'kellie',
        email: 'kellie@gmail.com',
        phone: '972-523-7199',
        password: hash,
      });
      await newUser.save();
      return request(server)
        .post('/users/login')
        .send({
          "email": 'kellie@gmail.com', // eslint-disable-line
          "password": '12345', // eslint-disable-line
        })
        .expect(200)
        .expect('x-auth-token', /.*/);
    });
  });
});
