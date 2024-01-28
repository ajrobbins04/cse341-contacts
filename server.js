// include all necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config(); // loads all environment variables from .env
const controller = require('./controllers/contacts');
const routes = require('./routes');
const { connectDB } = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

// method is defined in db/connect.js
connectDB();

// add middleware that parses incoming json requests
// into the request processing pipeline...can access
// this data from req.body
app.use(bodyParser.json());

// add middleware containing a CORS header that allows
// requests from any domain...use applies to all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// specify our url path for '/contacts' in the routes module
app.use('/', routes);

// use express's listen method to create a port so the application
// can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});
