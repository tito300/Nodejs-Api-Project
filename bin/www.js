const mongoose = require('mongoose'); // used to connect to db
const config = require('config'); // for grabbing onfig properties
const { app } = require('../app'); // import express app framework

process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);

// use enviroment port or default
const port = process.env.PORT || 3000;

// use db from config file
const dbUrl = config.get('db');

// connect to mongodb (make sure mongod is live)
if (app.get('env') === 'development') {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log(`connected to mongodb ${dbUrl} successfully`);
    })
    .catch(err =>
      console.log('connection to db was unsuccefull with error: ', err)
    );
}

// start server
const server = app.listen(port, err =>
  console.log(`server started at port ${port}`)
);

function errorHandler(err) {
  console.log('uncaughtException: ', err);
  process.exit();
}

module.exports = server;
