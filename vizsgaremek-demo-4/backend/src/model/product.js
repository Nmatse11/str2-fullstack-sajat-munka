const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  active: {
    type: Boolean,
    // alapértelmezett érték
    default: true
  }
});

module.exports = mongoose.model('Product', ProductSchema)