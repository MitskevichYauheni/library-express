var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  src: String,
  likes: {
    type: Number,
    default: 0
    },
  tags: Array
})

module.exports = mongoose.model('Photo', PhotoSchema);
