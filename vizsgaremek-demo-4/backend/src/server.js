const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
// másik domain névről is tudjunk kéréseket küldeni
const cors = require('cors');

// JWT
const authenticateJwt = require('./model/auth/authenticate')

const app = express();

// kiszedi az adatokat a config mappából
const { host, user, pass } = config.get('database');
mongoose.connect(`mongodb+srv://${host}`, {
  user,
  pass
}).then(conn => console.log('Connection success!'))
  .catch(err => {
    throw new Error(err.message);
  });

// --------- Middleware-ek -------------

// Másik domainnévről lehessen HTTP-kérés küldeni
// Cross origin resource sharing: CORS
app.use(cors());

// Statikus fájlok elérése
app.use(express.static('public'));

// HTTP-kérés body-ját parsolja, későbbi middleware-knél már nem kell parsolni
app.use(bodyParser.json())

// Products
// csak bejelentkezett felhasználók érik el
app.use('/product', authenticateJwt, require('./controller/product/product.router'))

// Login
app.use('/login', require('./controller/login/login.router'))

// Főoldal esetén
app.use('/', (req, res) => {
  res.send('api server')
});

// Hiba esetén
app.use((err, req, res, next) => {
  res.status = 500;
  res.json({
    hasError: true,
    message: 'Server Error'
  })
});

module.exports = app;