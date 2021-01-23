//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Einkauf = new Schema({
    date_begin: {
        type: Date,
        required: true
      },
    date_end: {
        type: Date,
      },
    sum: {
        type: Number,
      },
    items: {
      type: Array,
    }
  });

  module.exports = mongoose.model('Einkauf', Einkauf)