//Require NPM package and models
const express = require('express'),
  axios = require('axios'),
  cheerio = require('cheerio'),
  db = require('../models');

//Create router
const router = express.Router();

router.get('/scrape', (req, res) => {
  axios.get('http://www.northwestgeorgianews.com/rome/news/').then(resp => {
    var $ = cheerio.load(resp.data);

    $('.card-body').each(() => {
      var result = {};

      result.title = 'Test';
      // result.title = $(this)
      //   .find('a')
      //   .text();

      result.link =
        'http://www.northwestgeorgianews.com' +
        $(this)
          .find('a')
          .attr('href');

      db.Article.create(result)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          console.error(err);
        });
    });

    res.send('Scrape Complete');
  });
});

module.exports = router;
