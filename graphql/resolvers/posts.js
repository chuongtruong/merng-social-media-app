const {AuthenticationError} = require('apollo-server');

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
            console.log(user);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createAt: new Date().toISOString()
            });

            const post = await newPost.save();
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
        }
    }
}