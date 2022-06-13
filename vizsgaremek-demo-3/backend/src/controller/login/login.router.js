const express = require('express');
const User = require('../../model/user');

const router = express.Router();

//post
router.post('/', async (req, res, next) => {

  // új user létrehozása - CSAK EGYSZER HÍVJUK MEG
  /*
  const newUser = new User({
    email: 'test@test.hu',
    lastName: 'Elek',
    firstName: 'Test',
    password: 'test789',
  });

  try {
    await newUser.save();
  } catch (error) {
    res.statusCode = 401;
    return res.json({ error: 'Database Error!' });
  }

  return res.json({ message: 'user created' });
  */

  /*
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: '{}',
  })
    .then(r => r.json())
    .then(d => console.log(d))
  */


  const { email, password } = req.body;
  // email alapján keresünk
  const user = await User.findOne({ email });


  if (!user) {
    return res.sendStatus(401);
    //throw new Error('Incorrect Credentials')
  }

  user.comparePassword(password, function (err, isMatch) {
    if (err) {
      return res.sendStatus(403);
    }

    res.json({ success: true });
  });

  /*
  fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: '{"email": "test@test.hu", "password": "test789"}',
})
  .then(r => r.json())
  .then(d => console.log(d))
  */
});

module.exports = router;