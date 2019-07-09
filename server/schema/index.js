const { gql, mergeSchemas } = require('apollo-server-express');
const { FinanceCategory, FinanceSubCategory } = require('./financeModels');

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
    getCategories: [FinanceCategory]!
    getSubCategories(categoryId: Int!): [FinanceSubCategory]!
  }
`;

module.exports = [User, Workouts, FinanceCategory, FinanceSubCategory, Queries];
