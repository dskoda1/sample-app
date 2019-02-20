const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const models = require('./db/models');

const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');

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

// Set up entity routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;