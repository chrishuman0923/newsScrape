//Require NPM package and models
const express = require('express'),
  axios = require('axios'),
  cheerio = require('cheerio'),
  moment = require('moment'),
  db = require('../models');

//Create router
const router = express.Router();

//Get articles
router.get('/scrape', (req, res) => {
  axios
    .get('http://www.northwestgeorgianews.com/rome/news/')
    .then(resp => {
      const $ = cheerio.load(resp.data);

      $('.card-container').each(function() {
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

        result.date = $(this)
          .find('.card-date')
          .find('time')
          .attr('datetime');

        result.displayDate = moment(
          $(this)
            .find('.card-date')
            .find('time')
            .attr('datetime')
        ).format('MM/DD/YYYY hh:mm a');

        result.summary = $(this)
          .find('.tnt-summary')
          .text();

        result.img = $(this)
          .find('.image')
          .find('img')
          .attr('data-src');

        result.imgAlt = $(this)
          .find('.image')
          .find('img')
          .attr('alt');

        db.Article.create(result)
          .then(dbArticle => console.log(dbArticle))
          .catch(err => console.error(err));
      });

      res.status(200).send('Complete');
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
