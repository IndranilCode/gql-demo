const authors = require("./author");

//Resolvers
const resolvers = {
  Query: {
    getAuthors: () => authors,
    getFirstAuthor: () => authors[0],
    getSecondAuthor: () => authors[1],
    fetchAuthorById: (obj, { id }) => {
      return authors.find((author) => author.id === id);
    },
  },
  Mutation: {
    createAuthor: (obj, args) => {
      //Actual method that should create author in DB
      const id = String(authors.length + 1);
      const { name, gender } = args;

      const newAuthor = {
        id,
        info: {
          name,
          gender,
        },
      };

      authors.push(newAuthor);
      return newAuthor;
    },
    updateAuthor: (obj, { id, name, gender, age }) => {
      const author = authors.find((author) => author.id === id);
      if (!author) {
        throw new Error("Author not found");
      }

      const authorIndex = authors.indexOf(author);
      if (name) {
        author.info.name = name;
      }
      if (gender) {
        author.info.gender = gender;
      }
      if (age) {
        author.info.age = age;
      }
      authors[authorIndex] = { ...author, id };

      return author;
    },
    deleteAuthor: (obj, { id }) => {
      const author = authors.find((author) => author.id === id);
      if (!author) {
        throw new Error("Author not found");
      }

      const authorIndex = authors.indexOf(author);
      authors.splice(authorIndex, 1);

      return {
        id,
        message: `Author with ID ${id} deleted successfully`,
      };
    },
  },
};

module.exports = resolvers;