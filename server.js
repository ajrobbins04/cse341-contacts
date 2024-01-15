// include the express module
const express = require('express');
const app = express();
 
// use express's get method to create a home page
app.get('/', (req, res) => {
  res.send("Finn Dwyer");
});
 
const port = 3000;

// use express's listen method to create a port so the application
// can be tested on a browser
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});