// ******************************************* \\
// in this file we handle all routing without touching the database directly
// to query data and apply logic we use a service layer located in services folder
// this makes testing logic easier and code cleaner
//
//
const express = require('express');
const createError = require('http-errors');
const { productsService } = require('./services/index');

const router = express.Router();

// gets product by name or all
router.get('/:name', async (req, res, next) => {
  const name = req.params.name;
  if (name === 'all') {
    const product = await productsService.getAllProducts();
    if (product.length === 0) return res.send('No products available'); // <--- needs output - adjust test
    return res.send(product); // <--- needs output
  }
  const product = await productsService.getOneByName(name); // Product.findOne({ name }, 'price available -_id');

  if (product === null || product === undefined)
    return next(
      createError(404, 'item not available. double check your input')
    );

  res.send(`    product price: $${product._doc.price}  
    instock: ${product._doc.available}`); // <--- needs output - adjust test
});

// gets products by category
router.get('/category/:name', async (req, res, next) => {
  const category = req.params.name;

  const results = await productsService.getByCategory(category);

  if (results instanceof Error) return res.status(404).end('not found');
  res.json(results); // takes json arrays only // <--- needs output
  res.end();
});

module.exports = router;
