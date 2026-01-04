

/**
 * GraphQL Server with Apollo Server and Express
 * 
 * Apollo Server is a GraphQL server library that works with Node.js.
 * It implements the GraphQL specification and provides:
 * - Schema definition and type system
 * - Resolver functions for queries and mutations
 * - GraphQL Playground for testing queries
 * - Integration with Express.js middleware
 * 
 * In this demo:
 * - apollo-server-express: Apollo Server's Express.js integration
 * - express: Web server framework for handling HTTP requests
 * - GraphQL schema defines types (Author, Person) and operations (Query, Mutation)
 * - Resolvers contain the logic for fetching and manipulating data
 * 
 * The server runs on port 3501 and exposes GraphQL endpoint at /graphql
 */

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema"); //Import schema
const resolvers = require("./resolver"); //Import resolvers

const PORT = 3501;

//Start server function
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  //Starting the server
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT + "/graphql");
  });
}

startServer();