const express = require('express');
// creates custom errors and primarly used here for 404 error creation
const createError = require('http-errors');
// eliminates the need for try/catch blocks for handling rejected promises
require('express-async-errors');
//  morgan is used as a middleware to log http all requests
const morgan = require('morgan');
// const auth = require('./users/userAuthMiddleware');

// routing reference
const productsRouts = require('./products/productRouting');
const mainPage = require('./products/mainPageRouting');
const users = require('./users/usersRouting');

// creating express app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json()); // parses and adds body to req object in routers
// app.use(auth);
app.use('/', mainPage);
app.use('/products/', productsRouts);
app.use('/users/', users);

// handles 404 errors. these errors are not caused by an actual error
// they indicate that the req reach this last middleware without a response
app.use((req, res, next) => {
  next(createError(404));
});

// error handler. express middleware errors will be passed here
// without ha
// ving to use next()
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`something went wrong: ${err.message}`);
});

// exported to use in www.js file to start the server
module.exports.app = app;
