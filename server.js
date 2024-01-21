// include the express module
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const controller = require('./controllers/contacts');
const routes = require('./routes/contacts');

const { connectDB } = require('./db/connect');
connectDB();

const port = process.env.PORT || 3000;
 
app.use('/contacts', routes);


// use express's listen method to create a port so the application
// can be tested on a browser
app.listen(port, () => {
  console.log('Web Server is listening at port ' + (port));
});