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
  Einkauf.find({ "id": id}).exec((err, einkäufe) => {
    if (!err) {
      einkäufe[0].items.push({'name': escapeHtml(req.body.name), 'completed': false});
      einkäufe[0].save((err, einkäufe) => {
        res.redirect('/');
      });
    }
  });
})

module.exports = router;