const mongoose = require('mongoose');

// Konfiguration aus Umgebungsvariablen auslesen
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

// Verbindungsurl erstellen
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// Ausgabe der Verbindungsurl zur verwendung für MongoDB Compass
console.log(url);

// weitere Konfiguration für Verbindung
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

// Verbindung aufbauen
mongoose.connect(url, options).then( function() {
    console.log('MongoDB is connected');
  })
    .catch( function(err) {
      process.exit(-1)
  });