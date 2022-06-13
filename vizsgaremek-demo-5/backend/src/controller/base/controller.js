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
        .catch(err => {
          res.statusCode = 501;
          res.json(err)
        });
    },
    findOne(req, res, next) {
      return service.findOne(req.params.id)
        .then(entity => res.json(entity))
        .catch(err => {
          res.statusCode = 501;
          res.json(err)
        });
    },
    updateOne(req, res, next) {
      return service.updateOne(req.params.id, req.body)
        // sikeres frissítás után visszaküldjük a frissített adatokat
        .then(entity => res.json(entity))
        // hiba esetén
        .catch(err => {
          res.statusCode = 501;
          res.json(err);
        });
    }
  }
};