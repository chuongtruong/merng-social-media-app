import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { Button, Confirm, Icon } from 'semantic-ui-react';

import {FETCH_POSTS_QUERY} from '../util/graphql';

function DeleteButton({postId, callback}){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION,{
        //need proxy to modify catch cache
        update(proxy){
            //close the confirm modal
            setConfirmOpen(false);

            // remove post from cache
            //read the cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            //filter out deleted result
            // data.getPosts = data.getPosts.filter(p=> p.id !== postId)
            //update cache
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data:{getPosts: data.getPosts.filter(p=> p.id !== postId)}
            });

            if(callback){callback();} //help redirect to homepage if user hit delete the post 

        },
        variables: { postId}
    })


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
        onConfirm={deletePost}
      />
    </>
    );
}


const DELETE_POST_MUTATION = gql`
    mutation deletePst($postId: ID!){
        deletePost(postId: $postId)
    }
`
export default DeleteButton;


