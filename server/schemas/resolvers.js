const { AuthenticationError } = require("apollo-server-express");
const {signToken} = require("../utils/auth")
const {User} = require ("../models")

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            const foundUser = await User.findOne({_id: context.user._id});
        
            if (!foundUser) {
                throw new AuthenticationError("You need to be logged in!")
            }
        
            return (foundUser);
          }
    },
    Mutation: {
        createUser: async function(parent, args, context) {
            const user = await User.create(args);
        
            if (!user) {
                throw new AuthenticationError("Something is wrong!")
            }
            const token = signToken(user);
            return ({ token, user });
          },
          login: async function(parent, args, context) {
            const user = await User.findOne({email: args.email});
            if (!user) {
                throw new AuthenticationError("No user is found")
            }
        
            const correctPw = await user.isCorrectPassword(args.password);
        
            if (!correctPw) {
                throw new AuthenticationError("Password is wrong!")
            }
            const token = signToken(user);
            return ({ token, user });
          },
          saveBook: async function(parent, args, context) {
            try {
                console.log(context.user)
                console.log(args)
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.bookToSave } },
                { new: true, runValidators: true }
              );
              return updatedUser;
            } catch (err) {
              console.log(err);
              throw new AuthenticationError("Something is wrong!")
            }
          },
          deleteBook: async function(parent, args, context) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: args.bookId } } },
              { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError("Something is wrong!")
            }
            return (updatedUser);
          },
    }
}

module.exports = resolvers;