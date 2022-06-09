//itt lesz a logika, ami az autentikációt elvégzi
const jwt = require('jsonwebtoken');

// mi legyen, ha jön egy HTTP kérés
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Bearer sfjskdljfkdsjfskdl;
    // csak a kód kell nekünk
    const token = authHeader.split(' ')[1]
    // ellenőrzés
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      // ha sikerült azonosítani, akkor beállítjuk a request-nek a usert, ezt megkapja adminOnly.js és ellenőrzi
      req.user = user;
      next()
    });
  } else {
    res.sendStatus(401)
  };

}