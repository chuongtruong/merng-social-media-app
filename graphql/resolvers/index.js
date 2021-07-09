const testResolvers = require('./test')

const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');



module.exports = {
    Post:{
        likeCount: (parent) => {
            console.log(parent)
            return parent.likes.length
        },
        commentCount: (parent) => {
            parent.comments.length
        }

    },

    Query: {
        ...testResolvers.Query,
        ...postsResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription
    }

}