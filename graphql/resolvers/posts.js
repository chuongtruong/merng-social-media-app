const Post = require('../../models/Post');

module.exports = {
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