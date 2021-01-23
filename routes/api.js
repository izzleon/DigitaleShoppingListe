var express = require('express');
var router = express.Router();

var Einkauf = require('../models/einkauf.js');

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Test
router.post('/items/new', function (req, res) {

  Einkauf.find({ "date_end": {$exists: false}}).exec((err, einkäufe) => {
    if (!err) {
      einkäufe[0].items.push({'name': escapeHtml(req.body.name), 'completed': false});
      einkäufe[0].save((err, einkäufe) => {
        res.redirect('/');
      });
    }
  });
})

router.post('/items/complete/:id', function (req, res) {
  let id = req.params.id
  Einkauf.find({ "date_end": {$exists: false}}).exec((err, einkäufe) => {
    if (!err) {
      einkäufe[0].items[id].completed = !einkäufe[0].items[id].completed;
      einkäufe[0].markModified('items');
      einkäufe[0].save((err, einkauf) => {
        res.redirect('/');
      });
    }
  });
})

router.post('/items/delete/:id', function (req, res) {
  let id = req.params.id
  Einkauf.find({ "date_end": {$exists: false}}).exec((err, einkäufe) => {
    if (!err) {
      einkäufe[0].items.splice(id, 1);
      einkäufe[0].markModified('items');
      einkäufe[0].save((err, einkauf) => {
        res.redirect('/');
      });
    }
  });
})

router.post('/complete', function (req, res) {
  let sum = req.body.sum.replace(',', '.');

  Einkauf.find({ "date_end": {$exists: false}}).exec((err, einkäufe) => {
    if (!err && !isNaN(sum)) {
        req.body.sum.replace(',', '.')
        einkäufe[0].sum = req.body.sum.replace(',', '.')
        einkäufe[0].date_end = Date.now();
        einkäufe[0].markModified('items');
        einkäufe[0].save()
        let newEinkauf = new Einkauf({ date_begin: Date.now()});
        newEinkauf.save(function (err) {
          if (err) return handleError(err);
            res.redirect('/');
          });
    } else {
    res.send('eingabe falsch');
    }
  });
})

module.exports = router;