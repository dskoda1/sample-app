const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const models = require('./db/models');

const workoutRoutes = require('./routes/workouts');

// Create our app
const app = express();


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

// Cookie based sessions
app.use(cookieSession({
  name: 'App-Session',
  keys: ['my secret key!'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use('/api/workouts', workoutRoutes);


// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  // Return them as json
  res.json({hello:"hi"});
});

app.post(`/api/users`, (req, res) => {
  models.Users.create({
    username: req.body.data.username
  }).then(user => res.json(user))
})

app.post('/api/register', (req, res) => {
  // Verify username and password exist

  // Hash password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(424).json({err});
    }
    // Create new user
    models.Users.create({
      username: req.body.username,
      password: hash
    }).then(user => {
      req.session.username = user.username;
      req.session.userId = user.id;
      res.json({
        username: user.username,
      })
    });
  })
});

app.post('/api/login', (req, res) => {
  models.Users.findOne({ where: {username: req.body.username}}).then(user => {
    if (!user) {
      return res.status(401).json({'error': `Username ${req.body.username} not found`})
    }
    // compare the password with hash in db
    bcrypt.compare(req.body.password, user.password, (err, match) => {
      if (match) {
        req.session.username = user.username;
        req.session.userId = user.id;
        return res.status(200).json({username: user.username});
      }
      res.status(401).end();
    });
  });
});


app.get('/api/profile', (req, res) => {
  if (req.session.username) {
    console.log(req.session.username);
    return res.json({'username': req.session.username})
  }
  res.status(401).end();
})

app.post('/api/logout', (req, res) => {
  req.session = null;
  res.status(200).end();
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;