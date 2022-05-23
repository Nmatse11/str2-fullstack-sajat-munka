const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;

// http kérés  a főoldalra - get metódus
// app.get('/', (req, res) => {
//  res.send('Hello World!')
//});

app.use(bodyParser.json())

// routerek beállítása a use() segítségéve
app.use('/person', require('./controllers/person/routes'));

// port figyelése
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});