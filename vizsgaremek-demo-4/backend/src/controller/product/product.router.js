const express = require('express');
const Product = require('../../model/product');
const controller = require('../base/controller')(Product);

const router = express.Router();

//get
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
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