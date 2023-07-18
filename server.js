const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public/views'));

// Verbindung zur MongoDB im Docker-Container herstellen
const url = 'mongodb://database:27017'; 

// API-Endpunkt zum Abrufen der Daten
app.get('/', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Fehler bei der Verbindung zur Datenbank:', err);
      res.status(500).json({ error: 'Fehler bei der Verbindung zur Datenbank' });
      return;
    }

    const db = client.db('database'); 
    const collection = db.collection('pokemons');

    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error('Fehler beim Abrufen der Daten aus der Datenbank:', err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Daten aus der Datenbank' });
      } else {
        res.render('index', { data });
      }

      client.close(); // Verbindung zur Datenbank schließen
    });
  });
});

app.get('/details/:name', (req, res) => {
  const name = req.params.name;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Fehler bei der Verbindung zur Datenbank:', err);
      res.status(500).json({ error: 'Fehler bei der Verbindung zur Datenbank' });
      return;
    }

    const db = client.db('database');
    const collection = db.collection('pokemons');

    collection.findOne({ Name: name }, (err, pokemon) => {
      if (err) {
        console.error('Fehler beim Abrufen des Pokemons aus der Datenbank:', err);
        res.status(500).json({ error: 'Fehler beim Abrufen des Pokemons aus der Datenbank' });
      } else {
        res.render('details', { pokemon });
        console.log(pokemon);
      }

      client.close(); // Verbindung zur Datenbank schließen
    });
  });
});

// Starte den Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server sucht Pokemons in Pokeball ${port}`);
});





// const express = require('express');
// const app = express();
// const path = require('path');
// const fs = require('fs');
// const pokemons = require('./Pokemon.json')
// app.use(express.static('public'));

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'public/views'));

// app.get('/', (req, res) => {
//   const data = JSON.parse(fs.readFileSync('Pokemon.json', 'utf8'));
//   res.render('index', { data });
// });

// app.get('/details/:name', (req, res) => {
//   const name = req.params.name;
//   const pokemon = pokemons.find(pokemon => pokemon.Name === name);
//   res.render('details', { pokemon });
// })

// // Starte den Server
// app.listen(3000, () => {
//   console.log('Server sucht Pokemons auf Pokeball 3000');
// });