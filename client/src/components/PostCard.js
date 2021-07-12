import Reactfrom from "react";
import { Card, Icon, Label, Image } from "semantic-ui-react";
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
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>Some buttons here</p>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
