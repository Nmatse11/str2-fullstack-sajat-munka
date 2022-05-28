const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  // adattípusok
  firstName: String,
  lastName: String,
  email: String
}, {
  // időbélyeg
  timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);