const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const Product = require('../../products/productModel');
const { app } = require('../../app');

// One test suite that contains 3 test suites each of which contain individual tests
// all suits share one database connection. each of 3 sub suits have one server.
describe('Product router tests', () => {
  beforeAll(() => {
    if (process.env.NODE_ENV !== 'test') return new Error('wrong environment');
    return mongoose.connect(
      'mongodb://localhost/test2345',
      { useCreateIndex: true }
    );
  });
  beforeEach(() => {
    server = app.listen(3003);
  });
  afterEach(() => {
    server.close();
  });

  describe('main page route ./', () => {
    afterEach(() => Product.deleteMany());
    it('should return 404 on invalid route', () =>
      request(server)
        .get('/random')
        .expect(404));
    it('should return 200 on valid valid route', () =>
      request(server)
        .get('/')
        .expect(200));
  });
  describe('product routing ./products/...', () => {
    afterEach(() => Product.remove());
    it('should return 404 on invalid name', () =>
      request(server)
        .get('/products/random')
        .expect(404));
    it('should return 200 on valid name', async () => {
      await addData(1);
      return request(server)
        .get('/products/bonner')
        .expect(200);
    });
    it('should return price and availability', async () => {
      await addData(1);
      const result = await request(server).get('/products/bonner');
      return expect(result.text).toMatch(/18.34.*\s.*false|false.*\s.*18.34/);
    });
    it('should return 200 on /all', async () => {
      await addData(2);
      return request(server)
        .get('/products/all')
        .expect(200);
    });
    it('should return message of no products available', async () =>
      request(server)
        .get('/products/all')
        .expect(200)
        .expect('No products available'));
  });
  describe('>>> category routing ./products/category/...', () => {
    afterEach(() => Product.remove());
    it('should return 404 on invalid name', () =>
      request(server)
        .get('/products/category/random')
        .expect(404));
    it('should return 200 on valid name', async () => {
      await addData(1);
      return request(server)
        .get('/products/category/food')
        .expect(200);
    });
  });
});

// function to add fake data to test database
async function addData(num) {
  if (num === 1) {
    const product1 = new Product({
      _id: '5ba93a6d5d907d9512e43b75',
      name: 'bonner',
      disc: 'Velit irure quis quis adipisicing irure culpa.',
      category: 'food',
      available: false,
      instock: 4,
      price: 18.34,
      picture: 'http://placehold.it/200x200',
      brand: 'bento',
      shipping: { weight: '0.36', size: 'small' },
      lastUpdated: 'Wed Feb 08 2017 23:39:16 GMT+0000 (UTC)',
      tags: ['funny', 'seasonal'],
    });
    return product1.save();
  }
  if (num >= 2) {
    return Product.collection.insertMany([
      {
        _id: '5ba93a6d5d907d9512e43b75',
        name: 'bonner',
        disc: 'Velit irure quis quis adipisicing irure culpa.',
        category: 'food',
        available: false,
        instock: 4,
        price: '18.34',
        picture: 'http://placehold.it/200x200',
        brand: 'bento',
        shipping: { weight: '0.36', size: 'small' },
        lastUpdated: 'Wed Feb 08 2017 23:39:16 GMT+0000 (UTC)',
        tags: ['funny', 'seasonal'],
      },
      {
        _id: '5ba93a6d5d907d9512e43b76',
        name: 'brock',
        disc: 'Velit irure quis quis adipisicing irure culpa.',
        category: 'fun',
        available: true,
        instock: 2,
        price: '20.34',
        picture: 'http://placehold.it/200x200',
        brand: 't&k',
        shipping: { weight: '0.36', size: 'small' },
        lastUpdated: 'Wed Feb 08 2017 23:39:20 GMT+0000 (UTC)',
        tags: ['funny', 'politics'],
      },
    ]);
  }
}
