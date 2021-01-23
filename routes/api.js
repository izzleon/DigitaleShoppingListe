var express = require('express');
var router = express.Router();

// Test
router.get('/test', function (req, res) {
  res.send('test');
})

module.exports = router;