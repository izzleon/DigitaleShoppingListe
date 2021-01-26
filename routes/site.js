var express = require('express');
var router = express.Router();

var Einkauf = require('../models/einkauf.js');

// Home page route.
router.get('/', function (req, res) {

  Einkauf.find({ "date_end": {$exists: false}}).exec((err, einkäufe) => {
    if (!err && einkäufe[0]) {
      res.render('index', {
        'einkauf': einkäufe[0]
      });
    } else {
      let newEinkauf = new Einkauf({ date_begin: Date.now(), items: []});
      newEinkauf.save(function (err) {
          res.redirect('/');
        });
    }
  });

})

router.get('/list', function (req, res) {

  Einkauf.find({ "date_end": {$exists: true, $ne: null}}).sort({ date_begin: -1 }).exec((err, einkäufe) => {
    if (!err) {
      res.render('list', {
        'einkaeufe': einkäufe
      });
    }
  });

});

router.get('/list/:id', function (req, res) {
  let id = req.params.id

  Einkauf.find({"_id": id}).exec((err, einkäufe) => {
    if (!err) {
      res.render('show', {
        'einkauf': einkäufe[0]
      });
    }
  });

});

router.get('/stats', function (req, res) {

  Einkauf.find({"date_end": {$exists: true, $ne: null}}).sort({ date_end: 1 }).exec((err, einkäufe) => {
    if (!err) {
      res.render('stats', {
        'einkäufe': einkäufe,
      });
    }
  });

});

router.get('/complete', function (req, res) {
  res.render('complete', {});
});

module.exports = router;