const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator')

const PostSchema = mongoose.Schema({
  // adattípusok
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  author: {
    // referencia id a person kollekcióból
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    require: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  }]
}, {
  // időbélyeg
  timestamps: true
}
);

// leellenőrzi, hogy jó authorId-t adtunk-e meg
PostSchema.plugin(idValidator)

module.exports = mongoose.model('Post', PostSchema);