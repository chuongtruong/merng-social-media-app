import Reactfrom from "react";
import {Link} from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

//when post is passed from Home, we can destrcucture post like post:{something, something, something}

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  // console.log("Props passed from HOME.js ", body);
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right'>
      <Button color='red'>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='red' pointing='left'>
      {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right'>
      <Button basic color='blue'>
        <Icon name='fork' />
        Fork
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
      {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
