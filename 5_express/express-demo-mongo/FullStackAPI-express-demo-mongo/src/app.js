const express = require('express');
const httpErrors = require('http-errors');
const config = require('config');
const mongoose = require('mongoose');

const logger = require('./module/logger')

const app = express();

// lekérjük az adatokat a config mappa default.json-ből
const { host, user, pass } = config.get('database')
// csatlakozás a szerverhez
mongoose.connect(`mongodb+srv://${host}`, {
  user,
  pass,
}).then(
  conn => {
    require('./seed/seeder');
    console.log('Database is seeded!');
  }
).catch(
  err => console.error(err)
)

// console.log(host, user, pass);

app.use(logger);

app.use(express.static('public'));

app.use((req, res, next) => {
  res.send(`<h1>Hello from Express!</h1>
  <img src='img/image.png'>`)
});

module.exports = app;