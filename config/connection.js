//Require NPM package
const mongoose = require('mongoose');

//Set MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/newsScraper';

//Set handle to connected DB
const db = mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

//Export connection
module.exports = db;
