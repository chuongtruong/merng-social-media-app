import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import {Button, Label, Icon} from 'semantic-ui-react';

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
    // determine whether current user like the post or not
    const [liked,setLiked] = useState(false);

    useEffect(() =>{
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes]);

    const [likePost, {error} ] = useMutation(LIKE_POST_MUTATION, {
        variables: {postIdL: id}
    });

    const likeButton = user ?  (
        liked ? (
            <Button color="teal">
            <Icon name="heart" />
          </Button>
        ) : (
            <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
        <Icon name="heart" />
      </Button>
    )

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
                likes username
            }
            likeCount
        }
    }
`

