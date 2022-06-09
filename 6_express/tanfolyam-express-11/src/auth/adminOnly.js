module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    // ha nem az admin, akkor visszaküldjük a nem azonosított felhasználót
    return res.sendStatus(401)
  }

  // ha minden rendben volt, akkor tovább küldjük, így csak az admin tud tovább lépni
  next()
};