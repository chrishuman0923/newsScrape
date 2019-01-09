//Require NPM package and models
const express = require('express'),
  db = require('../models');

//Create router
const router = express.Router();

router.get('/', (req, res) => {
  db.Article.find({})
    .populate('notes')
    .sort({ date: -1 })
    .then(docs => {
      //No documents in database
      if (docs.length === 0) {
        //Add the return to stop executing code
        return res.status(200).render('noArticles', {});
      }
      console.log(docs);
      res.status(200).render('index', { article: docs });
    })
    .catch(err => res.status(500).json(err));
});

//"Catch All" route
router.get('*', (req, res) => res.render('404'));

//Export router
module.exports = router;
