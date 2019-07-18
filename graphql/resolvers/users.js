const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserInputError} = require("apollo-server")

const { JwtSecret } = require("../../config");
module.exports = {
  Mutation: {
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {

        const user = await User.findOne({ email })
        if (user) {
            throw new UserInputError("User already exist", {
                errors: {
                    email: "This user already exists"
                }
            })
        }
      password = await bcrypt.hash(password, 11);

      const newUser = new User({
        email,
        password,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();
      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, JwtSecret,{expiresIn: "6h"});

      return {
          ...res._doc,
          id: res._id,
          token
      }
    }
  }
};
