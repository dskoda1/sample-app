const app = require('./server/app')
const port = process.env.PORT || 5000;
const models = require('./server/db/models');

models.sequelize.sync({'alter': true}).then(function () {
  app.listen(port);
  console.log(`Listening on ${port}`)
});