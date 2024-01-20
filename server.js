// include the express module
const express = require('express');
const app = express();
const controller = require('./controllers/index.js');
const connectDB = require('./db/connect');
connectDB();
 
// use express's get method to define a route when 
// handling a HTTP request
app.get('/', controller.finnRoute);
app.get('/ri', controller.rileyRoute);
 
const port = 3000;

// use express's listen method to create a port so the application
// can be tested on a browser
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});