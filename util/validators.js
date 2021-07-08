module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  //trim() remove leading space and ending space
  // const word = "    hello world   "
  //console.log(word) = "    hello world   "
  //console.log(word.trim()) = "hello world"
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  //this is error OBJECT
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  console.log("err arr", errors);
  console.log("Object keys(errors)", errors.length);

  return {
    errors,
    /*
      Object.keys(object_name) -> return an array contains all keys of provided object
      const object1 = {
        a: 'somestring',
        b: 42,
        c: false
      };
      console.log(Object.keys(object1));
      expected output: Array ["a", "b", "c"]
      */
    valid: Object.keys(errors).length < 1,
  };
};
