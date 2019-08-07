# ImproveMe

[![Build Status](https://travis-ci.org/dskoda1/ImproveMe.svg?branch=master)](https://travis-ci.org/dskoda1/ImproveMe)


## Getting Started

To run ImproveMe locally, nodejs, yarn, and postgres need to be installed. 

- NodeJS: Follow the instructions for your platform to install LTS [on the Node website](https://nodejs.org/en/download/).
- Yarn: Likewise, follow the instuctions [on the Yarn website](https://yarnpkg.com/en/docs/getting-started) for installation
- Postgres: Last but not least, [the Postgres website](https://www.postgresql.org/download/) has installation instructions.

Once all three major dependencies are installed, we need to get app dependencies installed.

```
# Download server packages
yarn install
# Go to client and do the same
cd client
yarn install
```

#### Database Setup

In order to get the database created, we need a new role created locally. Use `improveme_user` as the name of the 
new role. It needs to get at least DB create permission.

```
createuser --interactive --pwprompt
```

Next, lets create both the dev and test databases. We'll need to start using the `sequelize` binary which can be
done

```
NODE_ENV=development yarn run sequelize db:create
NODE_ENV=local_test yarn run sequelize db:create
```

Lastly, we'll run the migrations for both databases:

```
NODE_ENV=development yarn run sequelize db:migrate
NODE_ENV=local_test yarn run sequelize db:migrate
```

At this point the backend tests should be able to run:

```
yarn test
```

## Running

To run the app, ensure the steps in the getting started section have been followed.

Simply run the backend with `yarn run dev` and inside the client run `yarn start` to get the backend and front end running. 
Webpack dev server is used to proxy requests from the frontend to the backend during development.


