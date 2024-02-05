// include all necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config(); // loads all environment variables from .env

const swaggerUi = require('swagger-ui-express'); // apiDocument user interface
const swaggerDocument = require('./swagger.json'); // apiDocument (must come after interface)

const routes = require('./routes');
const { connectDB } = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

// method is defined in db/connect.js
connectDB();

// parses incoming json requests to
// access this data from req.body
app.use(bodyParser.json());

// allows requests from any domain for all routes hereafter
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// specify url paths for apiDocumentation and contacts (inside routes)
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', routes);

// create a port so the application can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});
