const ProductsService = require('./productsService');
const ProductModel = require('../productModel');

const productsService = new ProductsService(ProductModel);

module.exports = {
  productsService,
};
