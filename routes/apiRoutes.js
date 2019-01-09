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
        //Create new object to store the article info
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

        //Insert each article into DB
        db.Article.create(result)
          .then(dbArticle => console.log(dbArticle))
          .catch(err => console.error(err));
      });

      //Send back 'ok' status
      res.status(200).send('Complete');
    })
    //Catch and log error
    .catch(err => res.status(500).send(err));
});

//Create article note
router.post('/articles/:id', (req, res) => {
  //Create note in DB
  db.Note.create(req.body)
    //Add note id to article
    .then(dbNote => {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { notes: dbNote._id } },
        { new: true }
      );
    })
    //return article with note
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err));
});

router.delete('/note/:id', (req, res) => {
  db.Note.findByIdAndDelete({ _id: req.params.id })
    .then(dbNote => res.json(dbNote))
    .catch(err => res.json(err));
});

module.exports = router;
