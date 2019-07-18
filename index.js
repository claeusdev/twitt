const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("./models/Post")
const User = require("./models/User");

const { MongoURL } = require("./config");
const typeDefs = gql`
    type Post{
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!
    }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
        try {
            const posts = await Post.find()
            return posts
        } catch (error) {
            throw new Error(error)
        }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(MongoURL, { useNewUrlParser: true })
  .then(() => {
    return server
      .listen({
        port: 5000
      })
      .then(res => {
        console.log(`Server running at ${res.url}`);
      })
      .catch(err => {
        console.log(error);
      });
  })
  .catch(err => {
    console.log(err);
  });
