const express = require('express');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/userAuthMiddleware');
const { userService } = require('./services/index');

const router = express.Router();

// register
router.post('/register', async (req, res, next) => {
  // debugger;
  const result = await userService.registerUser(req.body);
  if (result instanceof Error) return next(result);
  res.setHeader('x-auth-token', result);
  res.send('signed up successfully. Please sign in to access your account');
});

// login
router.post('/login', async (req, res, next) => {
  const token = await userService.login(req.body);

  if (token instanceof Error) return next(token);
  res.setHeader('x-auth-token', token);
  res.send('logged in successfuly');
});

//  list cart items
//  read notes 15 to view previous problem
router.get('/cart', auth, async (req, res, next) => {
  const userId = req.payload.id;
  const cartItems = await userService.getCartItems(userId);

  if (cartItems instanceof Error) return next(token);

  if (cartItems.length === 0) return res.status(200).send('cart is empty');

  res.send(`items in cart: ${cartItems.cart}`);
});

// adds item to cart
router.post('/cart/:id', auth, async (req, res, next) => {
  const body = req.body;
  const userId = req.payload.id;
  const updated = await userService.addItemToCart(body, userId);

  if (updated instanceof Error) return next(updated);

  res.send('item was added to cart successfully..');
});

// deletes item from cart
router.delete('/cart/:id', auth, async (req, res, next) => {
  const itemId = req.params.id;
  const userId = req.payload.id;
  const added = await userService.deleteItemFromCart(itemId, userId);
  if (added instanceof Error) return next(added);
  res.send('item was deleted successfully');
});

module.exports = router;
