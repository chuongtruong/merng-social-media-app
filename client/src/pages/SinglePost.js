// import React, { useContext } from "react";
// import { useQuery } from "@apollo/react-hooks";
// import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react";
// import { AuthContext } from "../context/auth";
// import gql from "graphql-tag";
// import moment from "moment";

// import LikeButton from "../components/LikeButton";
// import DeleteButton from "../components/DeleteButton";

// const SinglePost = (props) => {
//   const postId = props.match.params.postId;

//   const {data: {getPost} = {}} = useQuery(FETCH_POST_QUERY, {
//     variables: {
//       postId,
//     },
//   });

//   function  deletePostCallback(){
//       props.history.push('/')
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
//         <Grid>
//           <Grid.Row>
//             <Grid.Column width={2}>
//               {/* Avatar */}
//               <Image
//                 src="https://react.semantic-ui.com/images/avatar/large/molly.png"
//                 size="small"
//                 float="right"
//               />
//             </Grid.Column>
//             <Grid.Column width={10}>
//               <Card fluid>
//                 <Card.Content>
//                     <Card.Header>{username}</Card.Header>
//                     {/* Created At */}
//                   <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
//                   <Card.Description>{body}</Card.Description>
//                 </Card.Content>
//                 <hr />
//                 <Card.Content extra>
//                   {/* Like Button  */}
//                   <LikeButton user={user} post={{ id, likeCount, likes }} />
//                   {/* Comment Button */}
//                   <Button
//                     as="div"
//                     labelPosition="right"
//                     onClick={() => console.log("Comment")}
//                   >
//                     <Button basic color="blue">
//                       <Icon name="comments"></Icon>
//                     </Button>
//                     <Label basic color="blue" pointing="left">
//                       {commentCount}
//                     </Label>
//                   </Button>
//                   {/* DeleteButton */}
//                   {/* If this post belongs to current user, delete button will show */}
//                   {user && user.username === username && (
//                     //callback function will help redirect to homepage when the post is deleted by user
//                     <DeleteButton postId={id} callback={deletePostCallback}/>
//                   )}
//                 </Card.Content>
//               </Card>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       );
//     }

//     return postMarkup;
//   }
  

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




import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import gql from "graphql-tag";
import moment from "moment";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;

  const {data: {getPost} = {}} = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function  deletePostCallback(){
      props.history.push('/')
  }

  const { user } = useContext(AuthContext);



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
                  {/* DeleteButton */}
                  {/* If this post belongs to current user, delete button will show */}
                  {user && user.username === username && (
                    //callback function will help redirect to homepage when the post is deleted by user
                    <DeleteButton postId={id} callback={deletePostCallback}/>
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }

    return postMarkup;
  }
  

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

export default SinglePost;
