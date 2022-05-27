const express = require('express');
const data = require('./data');
const createError = require('http-errors')
const logger = require('../../config/logger')

// express útválasztó router létrehozása
const controller = express.Router()

// Get all person
controller.get('/', (req, res) => {
  // debug szintű logolás - nem kerül bele a fájlba
  // kiírjuk, hogy hány elemet adtunk vissza a kliensnek
  logger.debug(`Get all persons, returning ${data.length} items.`);
  // a nyers adatokat json formátumban adja vissza
  res.json(data)
});

// Get one person
controller.get('/:id', (req, res, next) => {
  const person = data.find(person => person.id === Number(req.params.id));
  if (!person) {
    return next(new createError.NotFound('Person is not found.'))
  }
  res.json(person)
});

// Create a new person
controller.post('/', (req, res, next) => {
  const { last_name, first_name, email } = req.body
  if (!last_name || !first_name || !email) {
    return next(
      new createError.BadRequest('Missing properties!')
    )
  }


  const newPerson = req.body;
  newPerson.id = data[data.length - 1].id + 1;
  data.push(newPerson);

  res.status(201);
  res.json(newPerson);
})

// Update a person
controller.put('/:id', (req, res, next) => {
  const id = req.params.id;
  // const id = parseInt(req.params.id)
  const index = data.findIndex(person => person.id === Number(id));
  const { last_name, first_name, email } = req.body
  if (!last_name || !first_name || !email) {
    return next(
      new createError.BadRequest('Missing properties!')
    )
  }

  data[index] = {
    id,
    first_name,
    last_name,
    email
  };
  /*
  data[index] = {
    "id": id,
    "first_name": req.body["first_name"],
    "last_name": req.body["last_name"],
    "email": req.body["email"]
  };
  */

  //res.send(data[index])
  res.json(data[index]);
})

// Delete a person
controller.delete('/:id', (req, res, next) => {
  const index = data.findIndex(person => person.id === Number(req.params.id));
  if (index === -1) {
    return next(new createError.NotFound('Person is not found.'))
  }
  data.splice(index, 1);
  res.json({})
});

module.exports = controller;