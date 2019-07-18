const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs")
const resolvers = require('./graphql/resolvers')
const { MongoURL } = require("./config");

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
