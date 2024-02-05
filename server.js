// include all necessary modules
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
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

// Use cors middleware to handle CORS headers
const corsOptions = {
  origin: 'https://cse341-contacts-frontend.netlify.app',
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// specify url paths for apiDocumentation and contacts (inside routes)
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', routes);

// create a port so the application can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});
