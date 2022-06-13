const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Bearer gdgsdgsdfksfsaédlsd.sadfafas
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'egynagyontitkosszöveg', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      // ez a user a tokenben eltárolt user, azok adatokat tudjuk kiszedni, ami benne van
      // ez nem az adatbázissal kommunikál
      // sikerült az azonosítás
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};