const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY} = require('../../config');
const Users = require("../../models/Users");

module.exports = {
  Mutation: {
    async register( _, { registerInput: { username, email, password, confirmPassword } }, context, info ) {
      //TODO: validate user data
      //TODO: Make sure user deosn't already exist
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

        const token = jwt.sign({
            id: res.id,
            email: res.email,
            username: res.username
        }, SECRET_KEY, {expiresIn: '1h'});
        return {
            ...res.doc,
            id: res._id,
            token
        }
    },
  },
};
