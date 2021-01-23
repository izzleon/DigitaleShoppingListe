const express = require('express');
const app = express();
const db = require('./db');

// Import Routes
var sites = require('./routes/site.js');
var api = require('./routes/api.js');

// Config
const port = process.env.PORT || 8080;
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Statisch
app.use(express.static('public'));

// Start Server
app.listen(port, function () {
    console.log(`Example app listening on ${port}!`);
})

// Use Routes
app.use('/', sites);
app.use('/api', api);
