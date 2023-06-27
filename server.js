const express = require('express');
const app = express();

// Setze den View-Engine auf Pug
app.set('view engine', 'pug');

// Definiere eine Route und rendere die Pug-Datei
app.get('/', (req, res) => {
  const jsonData = require('./pokemon.json');
  res.render('index', { data: jsonData });
});

// Starte den Server
app.listen(5500, () => {
  console.log('Server started on port 5500');
});
