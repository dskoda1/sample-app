const router = require('express').Router();
const models = require('../db/models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  // Verify username and password exist
  const username = (req.body.username || '').toLowerCase();
  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: 'Username must be at least 3 characters' });
  }

  const password = req.body.password;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 6 characters' });
  }

  // Hash password
  const hash = await bcrypt.hash(req.body.password, 10);
  if (!hash) {
    return res.status(424).json({ err });
  }

  // Create new user
  const user = await models.Users.create({
    username,
    password: hash,
  });

  req.session.username = user.username;
  req.session.UserId = user.id;
  res.status(201).json({
    username: user.username,
  });
});

router.post('/login', async (req, res) => {
  const username = (req.body.username || '').toLowerCase();

  const user = await models.Users.findOne({ where: { username } });

  if (!user) {
    return res.status(401).end();
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(401).end();
  }

  req.session.username = user.username;
  req.session.UserId = user.id;

  return res.status(202).json({ username: user.username });
});

router.get('/profile', (req, res) => {
  if (req.session.username) {
    return res.json({ username: req.session.username });
  }
  res.status(401).end();
});

router.post('/logout', (req, res) => {
  if (!req.session.username) {
    return res.status(401).end();
  }

  req.session = null;
  return res.status(200).end();
});

module.exports = router;
