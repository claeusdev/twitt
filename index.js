const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const { MongoURL } = require("./config");
const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello world"
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
