const express = require("express");
const { ApolloServer } = require("apollo-server-express");

//Fake DB data - Actual data would come from a database
const authors = [
  {
    id: "1",
    info: {
      name: "Indranil",
      age: 39,
      gender: "M",
    },
  },
  {
    id: "2",
    info: {
      name: "Ridhaan",
      age: 5,
      gender: "M",
    },
  },
  {
    id: "3",
    info: {
      name: "Somrita",
      age: 35,
      gender: "F",
    },
  },
];

//GraphQL Schema in string format
const typeDefs = `
    type Author {
        id: ID!,
        info: Person
    }
    type Person {
        name: String!,
        age: Int,
        gender: String
    }
    type Query {
        getAuthors: [Author],
        getFirstAuthor: Author,
        getSecondAuthor: Author,
        fetchAuthorById(id: ID!): Author
    }
`;

//Resolvers
const resolvers = {
  Query: {
    getAuthors: () => authors,
    getFirstAuthor: () => authors[0],
    getSecondAuthor: () => authors[1],
    fetchAuthorById: (obj, {id}) => {
      return authors.find(author => author.id === id);
    },
  },
};

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