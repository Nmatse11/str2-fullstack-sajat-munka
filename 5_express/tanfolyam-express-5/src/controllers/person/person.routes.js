const express = require('express');
const controller = require('./person.controller')

const controller = express.Router()

// create 
controller.post('/', (req, res, next) => {
  return controller.create(req, res, next)
});

// read
controller.get('/', (req, res, next) => {
  return controller.findAll(req, res, next)
});

controller.get('/:id', (req, res, next) => {
  return controller.findOne(req, res, next)
});

// update
controller.put('/:id', (req, res, next) => {
  return controller.update(req, res, next)
});

// delete
controller.delete('/:id', async (req, res, next) => {
  return controller.delete(req, res, next)
});

module.exports = router