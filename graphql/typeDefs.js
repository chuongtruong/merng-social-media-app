const {gql} = require('apollo-server');

//type definition
module.exports = gql`
    # create a type Post, so that query getPost can be assigned as Post
    type Post{
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!,
    }
    type Query{
        getPosts:[Post]
    }
    type mutation{
        
    }
`