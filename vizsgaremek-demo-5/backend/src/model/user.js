const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// jelszó erőssége
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      // nem ismétlődhet ez az adat
      unique: true
    },
  },
  lastName: String,
  firstName: String,
  password: {
    type: String,
    required: true,
    // titkosítás kell hozzá - pre()
  }
});

UserSchema.pre('save', function (next) {
  const user = this;

  // ha nem lett a jelszó módosítva
  if (!user.isModified('password')) {
    return next();
  }

  // titkosítás
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    // salt - jelszó generált titkosított része
    // hash letitkosított jelszó
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  })
});

// jelszavak összehasonlítása
// candidatePassword -  ténylegesen beírt jelszó
// összehasonlítja és egyezteti a mentett titkosított jelszóval
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
