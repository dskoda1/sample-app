const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    id: Int!
    password: String!
    username: String!
    createdAt: String!
    updatedAt: String!
    workouts: [Workouts!]!
}

type Workouts {
    id: Int!
    name: String!
    finishedAt: String
    createdAt: String!
    updatedAt: String!
    user: User!
}

type Query {
    getUser(username: String!): User
    getAllUsers: [User!]!
}
`

module.exports = typeDefs