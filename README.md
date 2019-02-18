# News Scrape

The News Scraper App is an application that "scrapes" a local news website and renders information about their posted articles into the application. The app is deployed on Heroku [here](https://desolate-harbor-55384.herokuapp.com/).

## Functionality
The app has been preloaded with current news articles. However, the user can always check for new articles by clicking the "News Scrape" button on the application. The articles are displayed with the most recent at the top. The user also has the ability to save notes to the articles and remove them later.

## Notes
All of the data being scraped from the news site is being stored in Mongo DB.
Some of the pictures do not load because the news site does not consistently format their site to code their images the same way. They use different tags for different situations.

## Getting Started
1. `npm install`
2. `npm run start`
3. Click "Scrape New Articles" button
4. View Article
5. Add Article Note

## Technologies Used
- HTML 5
- CSS 3
- Bootstrap
- JavaScript
- JQuery
- Node.js
- Handlebars
- NPM
- Express.js
- Axios
- Cheerio
- Moment.js
- Heroku
- URL Routing
- API Routing
- Mongo DB
- Mongoose

## Future Enhancements
A future enhancement would be to handle scraping data when a site uses different nesting standards for their articles. Currently, this irregularity causes some articles to scrape with no image becuase they are nested differently.
