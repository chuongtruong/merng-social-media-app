const { gql } = require("apollo-server");

//type definition
module.exports = gql`
  # create a type Post, so that query getPost can be assigned as Post
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  
  type User {
    id: ID
    email: String
    token: String
    username: String
    createdAt: String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
