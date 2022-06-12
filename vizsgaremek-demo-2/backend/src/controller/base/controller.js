const express = require('express');
const baseService = require('./service')

// megkapta a modelt
module.exports = (model) => {
  // a baseservice azzal a model-lel dolgozik, amit megkapott
  const service = baseService(model)
  return {
    findAll(req, res, next) {
      return service.findAll()
        .then(list => res.json(list))
    }
  }
};