var express = require('express');
var router = express.Router();

var Einkauf = require('../models/einkauf.js')

// Home page route.
router.get('/', function (req, res) {

  Einkauf.find().limit(10).sort({ date_begin: -1 }).exec((err, einkäufe) => {
    res.render('index', {
      'eikaeufe': einkäufe
    });
  });

})

module.exports = router;