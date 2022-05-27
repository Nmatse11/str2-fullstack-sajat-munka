const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const logger = require('./config/logger')

const port = 3000;

// request logging
app.use(morgan('combined', { stream: logger.stream }));

// http kérés  a főoldalra - get metódus
// app.get('/', (req, res) => {
//  res.send('Hello World!')
//});

// static files
// app.use('/images', express.static('public/images'));
// itt már nem kell külön részletezni, mert tudja, hogy statikus fájlokat kell keresnie
app.use(express.static('public'));

app.use(bodyParser.json());

// routerek beállítása a use() segítségéve
app.use('/person', require('./controllers/person/routes'));

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  // logger is használható
  // logger.error(`ERR ${err.statusCode}: ${err.message}`)
  res.json({
    hasError: true,
    message: err.message
  });
});

// port figyelése
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});