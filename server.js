// include the express module
const express = require('express');
const app = express();
const controller = require('./controllers/index.js');
 
// use express's get method to create a home page
app.get('/', controller.finnRoute);
app.get('/riley', controller.rileyRoute);
 
const port = 3000;

// use express's listen method to create a port so the application
// can be tested on a browser
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});