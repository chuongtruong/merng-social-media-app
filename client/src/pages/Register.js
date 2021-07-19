import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function Register() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  // handle Input Change
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //mutation to register a new user
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    //handle errors
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
    }, //or we can write like this {variables: values}
  });

  //handle form submit
  const onSubmit = (event) => {
    console.log("values ", values);
    event.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        {/* Input username */}
        <Form.Input
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
        />
        {/* Input email */}

        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          value={values.email}
          onChange={onChange}
        />

        {/* Input password */}

        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
        />

        {/* Input confirm password */}

        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>

      {/* display error message if it exists */}

      {Object.keys(errors).length > 0 && (
        <div className="ui error messages">
          <ul className="list">
            {Object.values(errors).map((value) => {
              <li key={value}>{value}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
