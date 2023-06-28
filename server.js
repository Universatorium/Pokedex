const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const pokemons = require('./Pokemon.json')
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public/views'));

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('Pokemon.json', 'utf8'));
  res.render('index', { data });
});

app.get('/details/:name', (req, res) => {
  const name = req.params.name;
  const pokemon = pokemons.find(pokemon => pokemon.Name === name);
  res.render('details', { pokemon });
})

// Starte den Server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});