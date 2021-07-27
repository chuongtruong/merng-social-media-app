// const {AuthenticationError, UserInputError} = require('apollo-server');
// const checkAuth = require('../../util/check-auth');

// const Post = require('../../models/Post');

// module.exports = {
//     Mutation: {
//         createComment: async (_,{postId, body}, context) => {
//              /* 
//                Check if user is login
//                Check if comments is empty, if not throw err
//                Find post use postId, if found, add new comments into the post.comments
//                Use unshipt

//                 */
            
//             const {username} = checkAuth(context);
//             if(body.trim() === ''){
//                 throw new UserInputError('Empty comment', {
//                     errors: {
//                         body: 'Comment body must not be empty',
//                     }
//                 })
//             }

//             const post = await Post.findById(postId);

//             if(post){
                
//                 /* 
//                 The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
//                 const array1 = [1, 2, 3];

//                 console.log(array1.unshift(4, 5));
//                 expected output: 5

//                 console.log(array1);
//                 expected output: Array [4, 5, 1, 2, 3]
//                 */

//                 post.comments.unshift({
//                     body,
//                     username,
//                     createdAt: new Date().toISOString()
//                 })
//                 await post.save();
//                 return post
//             } else {
//                 throw new UserInputError('Post not found');
//             }
//         },
//         deleteComment: async (_,{postId,commentId},context) => {
//             /*
//                 find post,
//                 find comment,
//                 check if comment's user = login user
//                 if yes -> comment.delete
//             */
            
//             const {username} = checkAuth(context);
            
//             const post = await Post.findById(postId);
//             if(post){
//                 const commentIndex = post.comments.findIndex( c => c.id === commentId)
                
//                 console.log("username", username)
//                 console.log("post username ", post.comments[commentIndex].username)

//                 if (post.comments[commentIndex].username === username ){
//                     post.comments.splice(commentIndex, 1);
//                     await post.save()
//                 } else {
//                     throw new AuthenticationError('Action not allowed')
//                 }
//             } else {
//                 throw new UserInputError('Post not found')
//             }
//         }
//     }
// }


const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
            console.log("username: ", username, " | post.comments.username: ", post.comments[commentIndex].username);
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
};