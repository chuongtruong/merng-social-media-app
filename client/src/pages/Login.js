import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from '../util/hooks';


//props is used to redirect page after from is submmited successfully 
function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});
    //useForm(callbackFunction, {initialState})
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

    // mutation to register a new user
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // update(_, result)
        update(_, { data: { login: userData } }) {
            //   console.log(result);
            console.log(userData);

            //pass data to context
            //instead of passing result.data.login, we can destrcucture result as {data: {login: userData}}
            //context.login(result.data.login)
            context.login(userData)

            //redirect to homepage.
            props.history.push('/')
        },
        //handle errors
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {
            username: values.username,
            password: values.password,
        }, //or we can write like this {variables: values}
    });

    function loginUserCallback() {
        loginUser();
      }
    
    return (
        <div className="form-container">
            {/* Html by default will try to validate field
    noValidate will prevent that
    */}
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                {/* Input username */}
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />

                {/* Input password */}
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />

                <Button type="submit" primary>
                    Login
                </Button>
            </Form>

            {/* display error message if it exists */}

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

//graphql mutation
const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
      id
      username
      token
    }
  }
`;

export default Login;
