const testResolvers = require('./test')

const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');



module.exports = {
    Query: {
        ...testResolvers.Query,
        ...postsResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}