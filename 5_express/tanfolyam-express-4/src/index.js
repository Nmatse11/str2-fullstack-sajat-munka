require('dotenv').config();
const config = require('config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const logger = require('./config/logger')
const mongoose = require('mongoose')
// Promisként szeretnénk dolgozni vele
mongoose.Promise = global.Promise
// Atlas jelszó - Q1HhMl1xz4sdTrgD

const port = process.env.PORT || 3000;

// Ha a config-ban nincs database - hiba logolás és alkalmazás leállítása
if (!config.has('database')) {
  logger.error('No database config found.');
  process.exit();
}

// változók lementése a config-ból
const { username, password, host } = config.get('database');

// Database connection
// mongoose.connect('mongodb+srv://Nodeuser:Q1HhMl1xz4sdTrgD@cluster0.wungfue.mongodb.net/?retryWrites=true&w=majority', {
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, {
mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, {
  // új url értelmezőt használunk
  useNewUrlParser: true,
  // adatbázis feltérképezése
  useUnifiedTopology: true
})
  .then(() => logger.info('MongoDB connection has been established successfully.'))
  .catch(err => {
    logger.error(err);
    // leállítjuk az alkalmazást
    process.exit();
  })

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