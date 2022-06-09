const express = require('express');
const config = require('config')
const app = express();
const bodyParser = require('body-parser')
const logger = require('./config/logger')
const morgan = require('morgan');
const mongoose = require('mongoose')
// Promisként szeretnénk dolgozni vele
mongoose.Promise = global.Promise

// változók lementése a config-ból
const { username, password, host } = config.get('database');

// Database connection
// mongoose.connect('mongodb+srv://Nodeuser:<password>@cluster0.wungfue.mongodb.net/?retryWrites=true&w=majority', {
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
//app.use('/person', require('./controllers/person/routes'));
app.use('/person', require('./controllers/person/person.routes'));
app.use('/post', require('./controllers/post/post.routes'));

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  // logger is használható
  // logger.error(`ERR ${err.statusCode}: ${err.message}`)
  res.json({
    hasError: true,
    message: err.message
  });
});

module.exports = app;