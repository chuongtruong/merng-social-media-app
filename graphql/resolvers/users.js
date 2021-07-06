const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY} = require('../../config');

const {validateRegisterInput} = require('../../util/validators')
const User = require("../../models/User");
const {UserInputError} = require ('apollo-server')

module.exports = {
  Mutation: {
      //"register" is the name of the mutation resolver
    
    async register( _, { registerInput: { username, email, password, confirmPassword } }) {
      //TODO: validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      //TODO: Make sure user deosn't already exist
      const user = await User.findOne({username})
      if (user){
        //UserInputError is a function from apollo-server.
        //We use UserInputError instead of throw (err) because we want the error to show in graphql playground.
        //https://www.apollographql.com/docs/apollo-server/data/errors/
        throw new UserInputError('username is taken', {
          //this error object will be used later for the front-end to display on a form
          errors:{
            username: 'This username is taken'
          }
        })
      }
      //TODO: hash password and create an auth token
        //npm install bcryptjs jsonwebtoken
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            username,
            password,
            createdAt: new Date().toISOString()
        });

        const res = await newUser.save();
        console.log(res)

        const token = jwt.sign({
            id: res.id,
            email: res.email,
            username: res.username
        }, SECRET_KEY, {expiresIn: '1h'});

        return {
            ...res,
            id: res._id,
            token
        }
    },
  },
};
