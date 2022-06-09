const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const TagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
}, {
  timestamps: true
});

TagSchema.plugin(idValidator);

module.exports = mongoose.model('Tag', TagSchema);