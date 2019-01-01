//Require NPM package and models
const express = require('express'),
  db = require('../models');

//Create router
const router = express.Router();

router.get('/', (req, res) => {
  db.Article.find({})
    .sort({ articleDate: -1 })
    .then(docs => res.status(200).render('index', { article: docs }))
    .catch(err => res.status(500).json(err));
});

//"Catch All" route
router.get('*', (req, res) => res.render('404'));

//Export router
module.exports = router;
