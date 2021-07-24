import Reactfrom, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

//need AuthContext to have access to current user who logged in
//access user will let us know what post that user has
//so we can add delete button accordingly
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

//when post is passed from Home, we can destrcucture post like post:{something, something, something}

function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
  post,
}) {
  //access to username

  const {user} = useContext(AuthContext);

  // console.log("Props passed from HOME.js ", body);

  const commentOnPost = () => {
    console.log("Comment on post !!");
  };

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
        <LikeButton user={user} post={{id,likes,likeCount}}/>

        {/* Comments */}
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="teal" basic>
            <Icon name="chat" />
          </Button>
          <Label basic color="teal" pointing="left">
            {comments.length}
          </Label>
        </Button>

        {/* Add Delete Button */}
        {/* if there's a user and user.username == username then do....*/}
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            onClick={() => console.log("Delete Post")}
            floated= "right"
          >
            <Icon name="trash" style={{margin: 0}}></Icon>
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
