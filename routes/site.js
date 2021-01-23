var express = require('express');
var router = express.Router();

var Einkauf = require('../models/einkauf.js')

// Home page route.
router.get('/', function (req, res) {

  Einkauf.find({ "date_end": {$exists: false}}).exec((err, einkäufe) => {
    if (!err) {
      res.render('index', {
        'eikaeufe': einkäufe
      });
    }
  });

})

router.get('/list', function (req, res) {

  Einkauf.find({ "date_end": {$exists: true, $ne: null}}).sort({ date_begin: -1 }).exec((err, einkäufe) => {
    if (!err) {
      res.render('list', {
        'eikaeufe': einkäufe
      });
    }
  });

});

router.get('/stats', function (req, res) {

  Einkauf.find({ "date_end": {$exists: true, $ne: null}}).sort({ date_begin: -1 }).exec((err, einkäufe) => {
    if (!err) {
      res.render('stats', {
        
      });
    }
  });

});

module.exports = router;