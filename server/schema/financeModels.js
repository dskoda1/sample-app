const { gql } = require('apollo-server-express');

const FinanceCategory = gql`
  type FinanceCategory {
    id: Int!
    name: String!
    createdAt: String!
    updatedAt: String
    user: User
  }
`;

const FinanceSubCategory = gql`
  type FinanceSubCategory {
    id: Int!
    name: String!
    parent: FinanceCategory!
    user: User
    createdAt: String!
    updatedAt: String
  }
`;


module.exports = {
  FinanceCategory,
  FinanceSubCategory,
};