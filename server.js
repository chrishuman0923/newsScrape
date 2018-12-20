//Require NPM packages, port, and routes
const express = require('express'),
  app = express(),
  port = 3000,
  routes = require('./routes/htmlRoutes');

//Enable Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//app.use(routes);

//Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}.`);
});
