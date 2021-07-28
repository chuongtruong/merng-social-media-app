import React, { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Button, Card, Grid, Image, Icon, Label, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import gql from "graphql-tag";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);
  //a common use case for useRef use to reference to a HTML element, like selectQueryById in javascript
  //https://www.youtube.com/watch?v=t2ypzz6gJm0
  const commentInputRef = useRef(null)

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      setComment('');
      commentInputRef.current.blur() // commentInputRef is an useREF OBJECT, we need to access to the CURRENT property
      //blur() is to stop the blinker in the text field
      //focus() is to focus to the text field
    },
    variables:{ 
      postId,
      body: comment
     }
  })

  function deletePostCallback() {
    props.history.push("/");
  }



  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post....</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            {/* Avatar */}
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                {/* Created At */}
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {/* Like Button  */}
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                {/* Comment Button */}
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment")}
                >
                  <Button basic color="blue">
                    <Icon name="comments"></Icon>
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {/* COMMENT AREA */}
                {/* Show comment input area ONLY WHEN THERE'S A USER LOGGED IN */}
                {user && (
                <Card fluid>
                  <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input 
                        type="text" 
                        placeholder="comment.." 
                        name="comment" 
                        value={comment} 
                        onChange={event => setComment(event.target.value)}
                        ref={commentInputRef}
                        />
                      <button 
                        type="submit" 
                        className="ui button teal" 
                        disabled={comment.trim() ===''} 
                        onClick={submitComment}>
                          Submit
                      </button>
                    </div>
                  </Form>
                  </Card.Content>
                  
                </Card>)
                }

                {comments.map((comment) => (
                              <Card fluid key={comment.id}>
                                <Card.Content>
                                  <Grid>
                                  <Grid.Row>
                                    <Grid.Column width={10}>
                                      <Card.Header>{comment.username}</Card.Header>
                                      <Card.Meta>
                                        {moment(comment.createdAt).fromNow()}
                                      </Card.Meta>
                                      <Card.Description>{comment.body}</Card.Description>
                                    </Grid.Column>

                                    {/* Add a delete button to comment */}
                                    <Grid.Column width="2" floated="right">
                                      {user && comment.username === user.username && (
                                        <DeleteButton postId={postId} commentId={comment.id}>

                                        </DeleteButton>
                                      )}
                                    </Grid.Column>
                                  </Grid.Row>
                                  </Grid>
                                </Card.Content>
                              </Card>
                            ))}

                {/* DeleteButton */}
                {/* If this post belongs to current user, delete button will show */}
                {user && user.username === username && (
                  //callback function will help redirect to homepage when the post is deleted by user
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default SinglePost;

// import React, { useContext } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import {
//   Button,
//   Card,
//   Grid,
//   Image,
//   Icon,
//   Label,
//   Comment,
// } from "semantic-ui-react";
// import { AuthContext } from "../context/auth";
// import gql from "graphql-tag";
// import moment from "moment";

// import LikeButton from "../components/LikeButton";
// import DeleteButton from "../components/DeleteButton";

// const SinglePost = (props) => {

//   //get postId in dynamic route
//   const postId = props.match.params.postId;

//   const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
//     variables: {
//       postId,
//     },
//   });

//   function deletePostCallback() {
//     props.history.push("/");
//   }

//   const { user } = useContext(AuthContext);

//   let postMarkup;
//   if (!getPost) {
//     postMarkup = <p>Loading post....</p>;
//   } else {
//     const {
//       id,
//       body,
//       createdAt,
//       username,
//       comments,
//       likes,
//       likeCount,
//       commentCount,
//     } = getPost;

//     postMarkup = (
//       <Grid>
//         <Grid.Row>
//           <Grid.Column width={2}>
//             {/* Avatar */}
//             <Image
//               src="https://react.semantic-ui.com/images/avatar/large/molly.png"
//               size="small"
//               float="right"
//             />
//           </Grid.Column>
//           <Grid.Column width={10}>
//             <Card fluid>
//               <Card.Content>
//                 <Card.Header>{username}</Card.Header>
//                 {/* Created At */}
//                 <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
//                 <Card.Description>{body}</Card.Description>
//               </Card.Content>
//               <hr />
//               <Card.Content extra>
//                 {/* Like Button  */}
//                 <LikeButton user={user} post={{ id, likeCount, likes }} />
//                 {/* Comment Button */}
//                 <Button
//                   as="div"
//                   labelPosition="right"
//                   onClick={() => console.log("Comment")}
//                 >
//                   <Button basic color="blue">
//                     <Icon name="comments"></Icon>
//                   </Button>
//                   <Label basic color="blue" pointing="left">
//                     {commentCount}
//                   </Label>
//                 </Button>
//                 {/* DeleteButton */}
//                 {/* If this post belongs to current user, delete button will show */}
//                 {user && user.username === username && (
//                   //callback function will help redirect to homepage when the post is deleted by user
//                   <DeleteButton postId={id} callback={deletePostCallback} />
//                 )}

//               </Card.Content>
//             </Card>

//             {/* Show list of comments */}
//             {comments.map((comment) => (
//               <Card fluid key={comment.id}>
//                 <Card.Content>
//                   <Grid>
//                   <Grid.Row>
//                     <Grid.Column width={10}>
//                       <Card.Header>{comment.username}</Card.Header>
//                       <Card.Meta>
//                         {moment(comment.createdAt).fromNow()}
//                       </Card.Meta>
//                       <Card.Description>{comment.body}</Card.Description>
//                     </Grid.Column>

//                     {/* Add a delete button to comment */}
//                     <Grid.Column width="2" floated="right">
//                       {user && comment.username === user.username && (
//                         <DeleteButton postId={postId} commentId={comment.id}>

//                         </DeleteButton>
//                       )}
//                     </Grid.Column>
//                   </Grid.Row>
//                   </Grid>
//                 </Card.Content>
//               </Card>
//             ))}
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     );
//   }

//   return postMarkup;
// };

// const FETCH_POST_QUERY = gql`
//   query ($postId: ID!) {
//     getPost(postId: $postId) {
//       id
//       body
//       createdAt
//       username
//       likeCount
//       likes {
//         username
//       }
//       commentCount
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//     }
//   }
// `;

// export default SinglePost;
