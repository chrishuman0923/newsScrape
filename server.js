//Require NPM packages
const express = require('express'),
  exphbs = require('express-handlebars'),
  mongoose = require('mongoose');

//Set MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/newsScraper';

//Connect to DB
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

//Set express instance, port and routes
const app = express(),
  port = process.env.PORT || 3000,
  htmlRoutes = require('./routes/htmlRoutes'),
  apiRoutes = require('./routes/apiRoutes');

//Enable middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set handlebars as app template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Set static content directory
app.use(express.static('public'));

//Set routes
app.use(htmlRoutes);
app.use(apiRoutes);

//Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}.`);
});
