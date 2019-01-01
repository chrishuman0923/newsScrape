//Require NPM package and models
const express = require('express'),
  axios = require('axios'),
  cheerio = require('cheerio'),
  moment = require('moment'),
  db = require('../models');

//Create router
const router = express.Router();

router.get('/scrape', (req, res) => {
  axios.get('http://www.northwestgeorgianews.com/rome/news/').then(resp => {
    const $ = cheerio.load(resp.data);

    $('.card-body').each(function() {
      let result = {};

      result.title = $(this)
        .find('.tnt-headline')
        .find('a')
        .text();

      result.link =
        'http://www.northwestgeorgianews.com' +
        $(this)
          .find('.tnt-headline')
          .find('a')
          .attr('href');

      result.articleDate = moment(
        $(this)
          .find('.card-date')
          .find('time')
          .attr('datetime')
      ).format('MM/DD/YY, h:mm a');

      result.summary = $(this)
        .find('.tnt-summary')
        .text();

      db.Article.create(result)
        .then(dbArticle => console.log(dbArticle))
        .catch(err => console.error(err));
    });

    res.send('Scrape Complete');
  });
});

module.exports = router;
