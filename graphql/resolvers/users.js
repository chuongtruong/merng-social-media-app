const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");

//generateToken() will be using more than once,
//make it a global function so we can reuse.
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    // for login
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);
      return {
        ...user,
        id: user._id,
        token,
      };
    },
    //"register" is the name of the mutation resolver
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //TODO: validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //TODO: Make sure user deosn't already exist
      const user = await User.findOne({ username });
      if (user) {
        //UserInputError is a function from apollo-server.
        //We use UserInputError instead of throw (err) because we want the error to show in graphql playground.
        //https://www.apollographql.com/docs/apollo-server/data/errors/
        throw new UserInputError("username is taken", {
          //this error object will be used later for the front-end to display on a form
          errors: {
            username: "This username is taken",
          },
        });
      }
      //TODO: hash password and create an auth token
      //npm install bcryptjs jsonwebtoken
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      console.log(res);

      const token = generateToken(res);

      return {
        ...res,
        id: res._id,
        token,
      };
    },
  },
};
