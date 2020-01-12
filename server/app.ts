import express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import models from './db/models';

const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');
const exerciseRoutes = require('./routes/exercises');
const setRoutes = require('./routes/sets');
import activityTypeRoutes from './routes/activity';

// Create our app
const app: express.Application = express();

models.sequelize.authenticate();

// Set up logging
const node_env = process.env.NODE_ENV;
if (node_env === 'production' || node_env === 'staging') {
  app.use(morgan('combined'));
} else if (node_env === 'local_test') {
  // do nothing
} else {
  app.use(morgan('dev'));
}

const forceSSL = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const node_env = process.env.NODE_ENV;
  if (node_env !== 'production' && node_env !== 'staging') {
    return next();
  }

  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.get('Host') + req.url);
  }
  next();
};

// Set up https redirects
app.use(forceSSL);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());

// Cookie based sessions
app.use(
  cookieSession({
    name: 'App-Session',
    keys: ['my secret key!'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Set up entity routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
workoutRoutes.use('/:workoutId/exercises', exerciseRoutes);
exerciseRoutes.use('/:exerciseId/sets', setRoutes);
app.use('/api/activity', activityTypeRoutes);

import { ApolloServer } from 'apollo-server-express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
const typeDefs = require('./schema');
import resolvers from './resolvers';

const context = (
  params: ExpressContext | ExpressAuthenticatedContext
): ResolverContext => {
  if (!params.req.session.UserId) {
    console.log('No username');
    throw new Error('unauthorized');
  }
  return {
    UserId: params.req.session.UserId,
    models,
  };
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
server.applyMiddleware({ app });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

export default app;
export {
  // TODO: Datasources / apis
  context,
  app,
  typeDefs,
  resolvers,
  ApolloServer,
  server,
};
