//Require NPM package and models
const express = require('express'),
  db = require('../models');

//Create router
const router = express.Router();

router.get('/', (req, res) => {
  db.Article.find({})
    .then(docs => {
      res.status(200).json(docs);
      //res.render('index', docs);
    })
    .catch(err => {
      res.status(500).json(err);
      //res.render('404');
    });
});

module.exports = router;
