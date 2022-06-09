const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator')

const PersonSchema = mongoose.Schema({
  // adattípusok
  firstName: String,
  lastName: String,
  email: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
}, {
  // időbélyeg
  timestamps: true
});

PersonSchema.plugin(idValidator)

module.exports = mongoose.model('Person', PersonSchema);