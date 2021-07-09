const { gql } = require("apollo-server");

//type definition
module.exports = gql`

  # create a type Post, so that query getPost can be assigned as Post
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type Like{
    id: ID!
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
    # sample test query
    sayTest: String!

    # Real queries goes here
      #The reason return [Post] because resolver for getPosts will return a list of post.
      #Check getPosts in graphql/resolvers/posts.js
    getPosts: [Post] 
   
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!,body: String!): Post!
    deleteComment(postId:String!, commentId: String!): Post!
    likePost(postId: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;
