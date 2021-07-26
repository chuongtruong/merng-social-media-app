import react from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

import moment from 'moment';

function CommentArea({ comments }) {
    return (
           
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            {comments.length > 0 && 
                comments.map((comment) => (
                    <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>{moment(comment.createdAt).fromNow()}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                    </Comment.Content>
                    </Comment>
                ))
            }
        </Comment.Group>
    )
}

export default CommentArea;