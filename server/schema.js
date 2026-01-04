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
    type DeleteMessage {
        id: ID!,
        message: String
    }
    type Query {
        getAuthors: [Author],
        getFirstAuthor: Author,
        getSecondAuthor: Author,
        fetchAuthorById(id: ID!): Author
    }
    type Mutation {
        createAuthor(name: String!, gender: String): Author,
        updateAuthor(id: ID!, name: String, gender: String, age: Int): Author
        deleteAuthor(id: ID!): DeleteMessage
    }
`;

module.exports = typeDefs;