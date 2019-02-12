const express = require('express');
const path = require('path');

const app = express();

const models = require('./db/models');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  // Return them as json
  res.json({hello:"hi"});
});

app.post(`/api/users`, (req, res) => {
  models.User.create({
    username: req.body.data.username
  }).then(user => res.json(user))
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;

models.sequelize.sync().then(function () {
  app.listen(port);
  console.log(`Listening on ${port}`)
});