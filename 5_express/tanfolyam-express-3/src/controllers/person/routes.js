const express = require('express');
const data = require('./data');
const createError = require('http-errors')
const logger = require('../../config/logger')

const Person = require('../../models/person.model')

// express útválasztó router létrehozása
const controller = express.Router()

// Get all person
controller.get('/', async (req, res) => {
  // ha nem adunk meg paramétert, akkor az összes elemet lekéri az adatbázisból
  const people = await Person.find()
  // debug szintű logolás - nem kerül bele a fájlba
  // kiírjuk, hogy hány elemet adtunk vissza a kliensnek
  logger.debug(`Get all peolpe, returning ${people.length} items.`)
  // a nyers adatokat json formátumban adja vissza
  res.json(people);
});

// Get one person
controller.get('/:id', async (req, res, next) => {
  // const person = data.find(person => person.id === Number(req.params.id));
  const person = await Person.findById(req.params.id)
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

  // const newPerson = req.body;
  const newPerson = new Person({
    firstName: first_name,
    lastName: last_name,
    email: email
  });
  // newPerson.id = data[data.length - 1].id + 1;
  // data.push(newPerson);

  // elmentjük a módosításokat save()
  newPerson.save()
    .then(data => {
      res.status(201);
      res.json(data);
    })

})

// Update a person
controller.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  // const id = parseInt(req.params.id)
  // const index = data.findIndex(person => person.id === Number(id));
  const { last_name, first_name, email } = req.body
  if (!last_name || !first_name || !email) {
    return next(
      new createError.BadRequest('Missing properties!')
    )
  }

  /*
  data[index] = {
    id,
    first_name,
    last_name,
    email
  };*/
  /*
  data[index] = {
    "id": id,
    "first_name": req.body["first_name"],
    "last_name": req.body["last_name"],
    "email": req.body["email"]
  };
  */
  const update = {
    firstName: first_name,
    lastName: last_name,
    email: email
  };

  let person = {}
  try {
    // new: true - ha nem létezik, akkor létrehozza
    person = await Person.findByIdAndUpdate(id, update, { new: true, useFindAndModify: false })
  } catch (err) {
    return next(new createError.BadRequest(err))
  }

  //res.send(data[index])
  //res.json(data[index]);
  return res.json(person)
})

// Delete a person
controller.delete('/:id', async (req, res, next) => {
  // const index = data.findIndex(person => person.id === Number(req.params.id));
  const { id } = req.params
  try {
    const person = await Person.findByIdAndDelete(id)
  }
  // if (index === -1) {
  catch (err) {
    return next(new createError.NotFound('Person is not found.'))
  }

  // data.splice(index, 1);
  res.json({})
});

module.exports = controller;