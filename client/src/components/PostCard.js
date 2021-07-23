import Reactfrom from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

//need AuthContext to have access to current user who logged in
//access user will let us know what post that user has
//so we can add delete button accordingly
import {AuthContext} from "../context/auth"
//when post is passed from Home, we can destrcucture post like post:{something, something, something}

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes, comments }, post
}) {

  // console.log("Props passed from HOME.js ", body);
  
  //Like post function
  function likePost(){
    console.log('Like post!!')
  }

  const commentOnPost = () => {
    console.log('Comment on post !!')
  }


  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* Like */}
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>

        {/* Comments */}
        <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="teal" basic>
            <Icon name="chat" />
          </Button>
          <Label basic color="teal" pointing="left">
            {comments.length}
          </Label>
        </Button>


      </Card.Content>
    </Card>
  );
}

export default PostCard;
