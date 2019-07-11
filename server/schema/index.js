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

const Responses = gql`
type CreateCategoryResponse {
  success: Boolean!
  message: String
  category: FinanceCategory
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

const Mutations = gql`
  type Mutation {
    createCategory(name: String!): CreateCategoryResponse!
  }
`;

module.exports = [User, Workouts, FinanceCategory, FinanceSubCategory, Responses, Queries, Mutations];
