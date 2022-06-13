const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    validate: {
      validator: function (v) {
        // regex validáció
        return /^[a-űA-Ű \-\.]{5,25}$/.test(v);
      }
    }
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