const express = require('express');
const Product = require('../../model/product');
const controller = require('../base/controller')(Product);

const router = express.Router();

//get
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

//get one
router.get('/:id', (req, res, next) => {
  return controller.findOne(req, res, next);
});

//update
router.patch('/:id', (req, res, next) => {
  return controller.updateOne(req, res, next);
});

module.exports = router;

/*
fetch('http://localhost:3000/product', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${temp1}`
    },
})
.then(r => r.json())
.then(d => console.log(d))
*/

/*
fetch('http://localhost:3000/product/628f3ba358cce6ca9393983b', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${temp1}`
    },
})
.then(r => r.json())
.then(d => console.log(d))
*/