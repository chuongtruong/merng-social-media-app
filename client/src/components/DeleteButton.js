import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  // console.log("CommentId is: ", commentId, postId)
  // console.log("mutation is: ", mutation);

  const [deletePostOrMutation] = useMutation(mutation, {
    //need proxy to modify catch cache
    update(proxy) {
      //close the confirm modal
      setConfirmOpen(false);

      if (!commentId) {
        // remove post from cache
        //read the cache
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        //filter out deleted result
        // data.getPosts = data.getPosts.filter(p=> p.id !== postId)
        //update cache
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
        });

        if (callback) {
          callback();
        }
        //help redirect to homepage if user hit delete the post
      }
    },

    //error catch
    onError(err) {
      console.log(err)
      return err;
    },

    variables: { postId, commentId },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
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
export default DeleteButton;
