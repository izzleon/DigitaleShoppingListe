/**
 * API Router enthält:
 *    * escapeHtml Funktion
 *    - Item erstellen
 *    - Item completed
 *    - Item löschen
 *    - Einkauf fertigstellen
 *    - Einkauf löschen
 */
// ----------------------------------------------------------------

var express = require('express');
var router = express.Router();

var Einkauf = require('../models/einkauf.js');


// Html ecape Funktion für Userinput
function escapeHtml(text) {
  // Auszutauschende Zeichen
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  // Zeichen austauschen
  return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}


// Item Erstellen
router.post('/items/new', function (req, res) {

  // Einkauf ohne Enddatum finden
  Einkauf.find({ "date_end": { $exists: false } }).exec((err, einkäufe) => {
    if (!err) {
      // Neues Item erstellen
      einkäufe[0].items.push({ 'name': escapeHtml(req.body.name), 'completed': false });

      // Einkauf speichern
      einkäufe[0].save((err, einkäufe) => {
        res.redirect('/');
      });
    }
  });
})


// Item completed
router.post('/items/complete/:id', function (req, res) {
  // Id aus Url-Parameter auslesen
  let id = req.params.id

  // Einkauf ohne Enddatum finden
  Einkauf.find({ "date_end": { $exists: false } }).exec((err, einkäufe) => {
    if (!err) {
      // Item auf completed setzten
      einkäufe[0].items[id].completed = !einkäufe[0].items[id].completed;

      // Einkauf speichern
      /** BUGFIX-LINE
       *  Änderungen eines Items in einem Array werden vom mongoose Datenbankadapter in der 
       *  Version 5.11.13 nicht automatisch erkannt und müssen deshalb manuel
       *  als geändert markiert werden, damit sie gespeichert werden
       */
      einkäufe[0].markModified('items');
      einkäufe[0].save((err, einkauf) => {
        res.redirect('/');
      });
    }
  });
})


// Item löschen
router.post('/items/delete/:id', function (req, res) {
  // Id aus Url-Parameter auslesen
  let id = req.params.id

  // Einkauf ohne Enddatum finden
  Einkauf.find({ "date_end": { $exists: false } }).exec((err, einkäufe) => {
    if (!err) {
      // Item aus dem Einkaufs-Item-Array löschen
      einkäufe[0].items.splice(id, 1);

      // Einkauf speichern);
      einkäufe[0].save((err, einkauf) => {
        res.redirect('/');
      });
    }
  });
})


// Einkauf fertigstellen
router.post('/complete', function (req, res) {
  let sum = req.body.sum.replace(',', '.');

  // Einkauf ohne Enddatum finden
  Einkauf.find({ "date_end": { $exists: false } }).exec((err, einkäufe) => {

    if (!err && !isNaN(sum)) {

      // Userinput für Kommerzahlen auch mit "," ermöglichen
      req.body.sum.replace(',', '.')

      // Neue Daten Einfügen
      einkäufe[0].sum = req.body.sum.replace(',', '.')
      einkäufe[0].date_end = Date.now();

      // Daten Speichern
      einkäufe[0].save()

      // Neuen Einkauf erstellen
      let newEinkauf = new Einkauf({ date_begin: Date.now() });
      newEinkauf.save(function (err) {
        if (err) return handleError(err);
        res.redirect('/');
      });
    }

    // Wenn Fehler bei DB oder Userinput
    else {
      // Errormsg an User
      res.send('Fehler bei Datenbankabfrage oder Userinput');
    }
  });
})


// Einkauf löschen
router.post('/einkauf/delete/:id', function (req, res) {
  // Id aus Url-Parameter auslesen
  let id = req.params.id

  // Einkäufe mit bestimmter id löschen
  Einkauf.deleteOne({ "_id": id }).exec((err, einkäufe) => {
    if (!err) {
      res.redirect('/list');
    }
  });

});


module.exports = router;