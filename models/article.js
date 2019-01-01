//Require NPM package and set handle to Schema constructor
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Create article schema
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  articleDate: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

//Create model from schema
const article = mongoose.model('Article', articleSchema);

//Export model
module.exports = article;
