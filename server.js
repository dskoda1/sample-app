const app = require('./server/app')
const port = process.env.PORT || 5000;
const models = require('./server/db/models');

console.log(`Node env: ${process.env.NODE_ENV}`)
app.listen(port);
console.log(`Listening on ${port}`)