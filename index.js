const {ApolloServer, PubSub} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config.js');

const pubsub = new PubSub();
const PORT = process.env.PORT || 5000


//setting up apollo playground server, more about ApolloSever https://www.apollographql.com/docs/apollo-server/api/apollo-server/
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub}) //1:20:30 -> take the request'body from express, forward to it resolver
    // An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation. 
    // This enables resolvers to share helpful context, such as a database connection.
});

// connect to mongoDB using mongoose
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB connection started')
        return server.listen({port: PORT})
    })

    .then(res => {
        console.log(`Appolo's server started at ${res.url}`);
    })

    .catch(err => {
        console.error("Mongoose Error", err)
    })
//End setting up apollo server



