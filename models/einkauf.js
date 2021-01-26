var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema Einkauf
var Einkauf = new Schema({

    // Erstelldatum
    date_begin: {
        type: Date,
        required: true
      },

    // Kaufdatum
    date_end: {
        type: Date,
      },
    
    // Preis des Einkaufes
    sum: {
        type: Number,
      },
    
    // Items(Produkte) des Einkaufes
    items: {
      type: Array,
    }
  });

  module.exports = mongoose.model('Einkauf', Einkauf)