import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

function LikeButton({ user, post: { id, likeCount, likes } }) {
    // determine whether current user like the post or not
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
          setLiked(true);
        } else {
            setLiked(false);    
        }
      }, [user, likes]);

      const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
      });
    
    const likeButton = user ? (
        //if there's a user logged in
        //check if that user liked the post or not
        //change like button accordingly
        liked ? (
          <Button float="right" color="teal">
            <Icon name="heart" />
          </Button>
        ) : (
            //basic properties is like to NOT fill the button with teal color
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        )
      ) : (
          //if there's no user loggin -> redirect to a login page
        <Button as={Link} to="/login" color="teal" basic>
          <Icon name="heart" />
        </Button>
      );

  return (
    <div>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </div>
  );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton;