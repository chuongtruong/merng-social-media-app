import React from 'react'
import {Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';


import {useForm} from '../util/hooks'
import {FETCH_POSTS_QUERY} from '../util/graphql';


export default function PostForm() {

    // useForm will return {values, onChange, onSubmit}
    const {values, onChange, onSubmit} = useForm(createPostCallBack,{
        body:''
    } )

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        //the problem is, when we post a new post, it won't show up in home
        //we don't want to refrest the page to use
        //INSTEAD WE WANT TO QUERY BASE ON POST THAT WE CURRENT HAVE IN THE APOLLO CACHE
        //we need PROXY to access the cache, usually if just ignore proxy update(_,result)
        update(proxy,result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            // data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data:{
                getPosts: [result.data.createPost, ...data.getPosts]
            }})
            console.log("result", result)
            values.body = '';
        },
            onError(err) {
                return err;
            }
    })

    function createPostCallBack(){
        createPost()
    }
    return (
            <>
            <Form onSubmit={onSubmit}>
                <h2>Create a new post:</h2>
                <Form.Field>
                    <Form.Input
                    placeholder="Hi world!"
                    name='body'
                    onChange={onChange}
                    value={values.body} 
                    error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                    <div className="ui error message" style={{marginBottom: 20}}>
                        <ul className="list">
                            <li>{error.graphQLErrors[0].message}</li>
                        </ul>
                    </div>
            )}
        </>
        
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likes{ id username createdAt}
            likeCount
            comments{ id body username createdAt}
            commentCount
        }
    }
`