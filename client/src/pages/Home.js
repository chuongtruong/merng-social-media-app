import React, { useContext, Component } from "react";
import { useQuery } from "@apollo/react-hooks";
// import {gql} from "graphql-client"; /*-> npm install  graphql graphql-tag*/
import { Grid, Transition } from "semantic-ui-react";

import {AuthContext} from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../util/graphql';

function Home() {
  const {user} = useContext(AuthContext);

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
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            {/* Create another component, keep Home component clean */}
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1> Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (

            // Put all posts inside transition group so that
            // every new post added, there's will be a transition
            //Transition group is from semantic UI
            <Transition.Group>
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
            </Transition.Group>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;