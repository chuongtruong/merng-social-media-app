const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config.js');


//setting up apollo playground server

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



