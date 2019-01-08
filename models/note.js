const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const noteSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
