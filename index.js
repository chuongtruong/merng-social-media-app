const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require("./models/Post");
const {MONGODB} = require('./config.js');


//setting up apollo playground server
//type definition
const typeDefs = gql`
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
`

const resolvers = {
    Query:{
        async getPosts(){
            //maybe the query won't never failed, but if no try-catch, no server will be stopped if the query is failed
            try{
                const posts = await Post.find();
                return posts
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// connect to mongoDB using mongoose
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB connection started')
        return server.listen({port: 5000})
    })

    .then(res => {
        console.log(`Appolo's server started at ${res.url}`);
    });
//End setting up apollo server



