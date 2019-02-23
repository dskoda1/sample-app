const router = require('express').Router();
const models = require('../db/models');
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  // Verify username and password exist
  // Hash password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(424).json({ err });
    }
    // Create new user
    models.Users.create({
      username: req.body.username,
      password: hash,
    }).then(user => {
      req.session.username = user.username;
      req.session.userId = user.id;
      res.json({
        username: user.username,
      });
    });
  });
});

router.post('/login', (req, res) => {
  models.Users.findOne({ where: { username: req.body.username } }).then(
    user => {
      if (!user) {
        return res
          .status(401)
          .json({ error: `Username ${req.body.username} not found` });
      }
      // compare the password with hash in db
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if (match) {
          req.session.username = user.username;
          req.session.userId = user.id;
          return res.status(200).json({ username: user.username });
        }
        return res
          .status(401)
          .json({ error: 'username or password incorrect' })
          .end();
      });
    }
  );
});

router.get('/profile', (req, res) => {
  if (req.session.username) {
    return res.json({ username: req.session.username });
  }
  res.status(401).end();
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.status(200).end();
});

module.exports = router;
