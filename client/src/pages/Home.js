import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
// import {gql} from "graphql-client"; /*-> npm install  graphql graphql-tag*/
import { gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from '../components/PostCard'

function Home() {
  const {
    loading,
    data: { getPosts: posts } = {},
  } = useQuery(FETCH_POSTS_QUERY);

// Check if data exists
//   if (data) {
//     console.log(data);
//   }

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1> Loading posts...</h1>
        ) : (
          posts && posts.map((post) => <Grid.Column key={post.id} style={{marginBottom: '20px'}}>
              <PostCard post={post}/>
          </Grid.Column>)
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      comments {
        id
        createdAt
        username
      }
      likes {
        id
        createdAt
        username
      }
    }
  }
`;

export default Home;