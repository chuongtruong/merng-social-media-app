const {AuthenticationError, UserInputError} = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');


module.exports = {
    Query:{
        async getPosts(){
            //maybe the query won't never failed, but if no try-catch, no server will be stopped if the query is failed
            try{
                const posts = await Post.find().sort({createdAt: -1});
                console.log("findPosts query", posts)
                return posts
            } catch(err) {
                throw new Error(err)
            }
        },

        async getPost(_, {postId}){
            try{
                const post = await Post.findById(postId);
                console.log("findPost query", post)
                if (post){
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch(err){
                throw new Error(err)
            }
        }
    },

    Mutation:{
        async createPost(_, {body}, context){
            // parameter [context] is passed from index.js as a req's body of express
            //TODO: user will login and get authentic token
            //TODO: put the token in authentic header, send the header with the request
            //TODO: get the token and decode, make sure the users is authenticated
            //TODO: create a post

            const user = checkAuth(context);
            //trim(), remove leading and ending space of the string and return the string
            if(body.trim() === '') {
                throw new Error("Post body must not be empty");
            }
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            console.log("New Post CreatedAt: ", newPost.createdAt);
            console.log("Test new Date(): ", new Date().toISOString());


            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })
            return post;
        },
        async deletePost(_,{postId}, context){
            const user = checkAuth(context);
            console.log(user);
            
            try{
                const post = await Post.findById(postId)
                if(user.username === post.username){
                    post.delete();
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch(err){
                throw new Error(err)
            }
        },
        likePost: async (_,{postId}, context) => {
            const {username} = checkAuth(context);

            const post = await Post.findById(postId)

            if(post){
                if(post.likes.find(like=>like.username === username)){
                    //if there's a like already -> unlike it
                    post.likes = post.likes.filter(like => like.username != username);
                    
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save();
                return post
            } else {
                throw new UserInputError('Post not found')
            }
        }
    },
    Subscription: {
        newPost:{
            subscribe: (_, __, {pubsub}) => {
                pubsub.asyncIterator('NEW_POST')
            }
        }
    }
    
}