/**
 * Site Router enthält:
 *    - Homepage
 *    - Liste der Einkäufe
 *    - Spezifischen Einkauf anzeigen
 *    - Statistik Page
 *    - Einkauf abschließen Page
 */
// ----------------------------------------------------------------

var express = require('express');
var router = express.Router();

var Einkauf = require('../models/einkauf.js');


// Home page route.
router.get('/', function (req, res) {

  // Einkauf ohne Enddatum finden
  Einkauf.find({ "date_end": { $exists: false } }).exec((err, einkäufe) => {
    
    // Wenn gefunden: rendern
    if (!err && einkäufe[0]) {
      res.render('index', {
        'einkauf': einkäufe[0]
      });
    } 

    // Wenn nicht gefunden:
    else {
      // Neuen Einkauf erstellen und Page neu laden
      let newEinkauf = new Einkauf({ date_begin: Date.now(), items: [] });
      newEinkauf.save(function (err) {
        res.redirect('/');
      });
    }
  });

})


// Alte Einkäufe Liste
router.get('/list', function (req, res) {

  // Einkäufe mit Enddatum finden und nach Enddatum absteigend sortieren
  Einkauf.find({ "date_end": { $exists: true, $ne: null } }).sort({ date_end: -1 }).exec((err, einkäufe) => {
    if (!err) {
      res.render('list', {
        'einkaeufe': einkäufe
      });
    }
  });

});


// Spezifischen einkauf anzeigen
router.get('/list/:id', function (req, res) {
  // Id aus Url-Parameter auslesen
  let id = req.params.id

  // Einkäufe mit bestimmter id finden
  Einkauf.find({ "_id": id }).exec((err, einkäufe) => {
    if (!err) {
      res.render('show', {
        'einkauf': einkäufe[0]
      });
    }
  });

});


// Statistiken
router.get('/stats', function (req, res) {

  // Einkäufe mit Enddatum finden und nach Enddatum aufsteigend sortieren
  Einkauf.find({ "date_end": { $exists: true, $ne: null } }).sort({ date_end: 1 }).exec((err, einkäufe) => {
    if (!err) {
      res.render('stats', {
        'einkäufe': einkäufe,
      });
    }
  });

});


// Einkauf abschließen
router.get('/complete', function (req, res) {
  res.render('complete', {});
});


module.exports = router;