const { gql, mergeSchemas } = require('apollo-server-express');

const User = gql`
  type User {
    id: Int!
    password: String!
    username: String!
    createdAt: String!
    updatedAt: String!
    workouts: [Workouts!]!
  }
`;

const Workouts = gql`
  type Workouts {
    id: Int!
    name: String!
    finishedAt: String
    createdAt: String!
    updatedAt: String!
    user: User!
  }
`;

const Queries = gql`
  type Query {
    getWorkouts: [Workouts]!
    getUser: User!
  }
`;

module.exports = [User, Workouts, Queries];
