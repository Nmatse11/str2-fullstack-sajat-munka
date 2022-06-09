//itt lesz a logika, ami az autentikációt elvégzi
const jwt = require('jsonwebtoken');

// mockolt userek
const Users = [
  {
    username: 'admin',
    password: 'admin_pw',
    role: 'admin'
  },
  {
    username: 'user',
    password: 'user_pw',
    role: 'user'
  }
];

// frissítő tokenek eltárolása
const refreshTokens = [];

module.exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = Users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    // hozzáférési azonosító generálása
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY
    });

    const refreshToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken)

    res.json({
      accessToken,
      refreshToken
    });
  } else {
    res.send('Username or password incorrect.');
  }
};

// mi legyen, ha jön egy HTTP kérés
module.exports.refresh = (req, res, next) => {
  // kiolvassuk a body-ból a dolgokat
  const { token } = req.body;

  // ha nincs token
  if (!token) {
    return res.sendStatus(401);
  }

  // ha nincs benne a refreshToken tömbben
  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  // ha van token és szerepel a tömbben, akkor ellenőrzés
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }

    // új accessToken generálása
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY
    });

    // csak az új accessToken visszaküldése
    res.json({
      accessToken
    });

  });
};


// már csak ki kell jelentkezni
module.exports.logout = (req, res) => {
  // req.body-ból kiszedjük az adatot, így tudjuk meg, hogy kit kell kijelentkeztetni
  const { token } = req.body

  // ha nincs benne a refreshToken tömbben
  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  // kivágjuk a tömbből a tokent
  const tokenIndex = refreshTokens.indexOf(token)
  refreshTokens.splice[tokenIndex, 1]

  res.sendStatus(200);
}


