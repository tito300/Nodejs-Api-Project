const mongoose = require('mongoose');
const seed = require('./seed');
const Product = require('../products/productModel');
// console.log(typeof seed);

const seedFinal = [];
seed.forEach(item => {
  item.name = item.name.toLocaleLowerCase(); // eslint-disable-line
  seedFinal.push(item);
});

mongoose
  .connect('mongodb://localhost/nodejsProject')
  .then(() => console.log('connected to mongodb'))
  .then(async () => {
    const count = await Product.count();
    if (count > 0) return console.log('data already exist');
    Product.insertMany(seedFinal, () => console.log('successfully added data'));
  })
  .catch(err => console.log(err));
