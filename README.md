# GraphQL Demo

A full-stack GraphQL demo application with Apollo Server (backend) and Apollo Client (frontend).

## Project Structure

```
gql-demo/
├── server/                    # GraphQL server implementation
│   ├── server.js             # Basic server setup
│   ├── server2.js            # Main server with CRUD operations
│   ├── schema.js             # GraphQL schema definitions
│   ├── resolver.js           # Query and mutation resolvers
│   ├── author.js             # Mock data
│   ├── package.json
│   └── README.md             # Server-specific documentation
└── client/
    └── gql-client-app/       # React + Apollo Client
        ├── src/
        │   ├── App.jsx       # Main component with queries
        │   ├── main.jsx      # Apollo Provider setup
        │   └── ...
        ├── vite.config.js
        └── package.json
```

## Getting Started

### Server Setup

**Installation**
```bash
cd server
npm install
```

**Development Mode (with auto-restart)**
```bash
npm run dev2
```

**Production Mode**
```bash
npm start
```

The server will start on `http://localhost:3501/graphql`

### Client Setup

**Installation**
```bash
cd client/gql-client-app
npm install
```

**Development Mode**
```bash
npm run dev
```

The client will start on `http://localhost:5173`

> **Note:** Make sure the server is running before starting the client.

## GraphQL Schema

### Types

**Author**
- `id`: ID! (required)
- `info`: Person

**Person**
- `name`: String! (required)
- `age`: Int
- `gender`: String

### Queries

- `getAuthors`: Returns all authors
- `getFirstAuthor`: Returns the first author
- `getSecondAuthor`: Returns the second author
- `fetchAuthorById(id: ID!)`: Returns a specific author by ID

### Mutations

- `createAuthor(name: String!, gender: String)`: Creates a new author
- `updateAuthor(id: ID!, name: String, gender: String, age: Int)`: Updates an existing author
- `deleteAuthor(id: ID!)`: Deletes an author and returns a confirmation message

## Example Queries

Visit `http://localhost:3501/graphql` in your browser to access the GraphQL Playground, then try these queries:

### Get all authors
```graphql
query {
  getAuthors {
    id
    info {
      name
      age
      gender
    }
  }
}
```

### Get first author
```graphql
query {
  getFirstAuthor {
    id
    info {
      name
      age
    }
  }
}
```

### Fetch author by ID

**Option 1: Direct query**
```graphql
query {
  fetchAuthorById(id: "1") {
    id
    info {
      name
      age
      gender
    }
  }
}
```

**Option 2: Using variables**
```graphql
query($authorId: ID!) {
  fetchAuthorById(id: $authorId) {
    info {
      name
      age
    }
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorId": "2"
}
```

**Option 3: Fetch multiple authors with aliases**
```graphql
query($authorId1: ID!, $authorId2: ID!) {
  author1: fetchAuthorById(id: $authorId1) {
    info {
      name
      age
    }
  },
  author2: fetchAuthorById(id: $authorId2) {
    info {
      name
      age
      gender
    }
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorId1": "2",
  "authorId2": "3"
}
```

**Option 4: Using fragments for reusable fields**
```graphql
query($authorId1: ID!, $authorId2: ID!) {
  author1: fetchAuthorById(id: $authorId1) {
    ...authorInfo
  },
  author2: fetchAuthorById(id: $authorId2) {
    ...authorInfo
  }
}

fragment authorInfo on Author {
  info {
    name
    age
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorId1": "2",
  "authorId2": "3"
}
```

**Option 5: Using @skip and/or @include directives for conditional fields**
```graphql
query($authorId1: ID!, $authorId2: ID!, $skipGender2: Boolean!, $includeGender1: Boolean!) {
  author1: fetchAuthorById(id: $authorId1) {
    info {
      name
      age
      gender @include(if: $includeGender1)
    }
  },
  author2: fetchAuthorById(id: $authorId2) {
    info {
      name
      age
      gender @skip(if: $skipGender2)
    }
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorId1": "2",
  "authorId2": "3",
  "includeGender1": false,
  "skipGender2": true
}
```

- `@include(if: $includeGender1)`: Only includes the gender field if the variable is `true`
- `@skip(if: $skipGender2)`: Skips the gender field if the variable is `true`

## Example Mutations

### Mutation 1: Create a new author

```graphql
mutation createNewAuthor($authorName: String!, $authorGender: String!) {
  createAuthor(name: $authorName, gender: $authorGender) {
    id
    info {
      name
      gender
      age
    }
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorName": "Pradip Basu",
  "authorGender": "M"
}
```

Response:
```json
{
  "data": {
    "createAuthor": {
      "id": "4",
      "info": {
        "name": "Pradip Basu",
        "gender": "M",
        "age": null
      }
    }
  }
}
```

### Mutation 2: Update an existing author

```graphql
mutation updateAuthor($authorId: ID!, $authorName: String, $authorGender: String, $authorAge: Int) {
  updateAuthor(id: $authorId, name: $authorName, gender: $authorGender, age: $authorAge) {
    id
    info {
      name
      age
      gender
    }
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorId": "1",
  "authorName": "Indranil Basu 2",
  "authorGender": "M",
  "authorAge": 40
}
```

Response:
```json
{
  "data": {
    "updateAuthor": {
      "id": "1",
      "info": {
        "name": "Indranil Basu 2",
        "age": 40,
        "gender": "M"
      }
    }
  }
}
```

### Mutation 3: Delete an author

```graphql
mutation deleteAuthor($authorId : ID!) {
  deleteAuthor(id: $authorId) {
    id
    message
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorId": "2"
}
```

Response:
```json
{
  "data": {
    "deleteAuthor": {
      "id": "2",
      "message": "Author with ID 2 deleted successfully"
    }
  }
}
```

## Dependencies

### Server
- `express`: Web server framework (v4)
- `apollo-server-express`: GraphQL server (v3)
- `core-js`: Polyfills
- `nodemon`: Auto-restart tool (dev dependency)

### Client
- `react`: Frontend library (v18)
- `@apollo/client`: GraphQL client (v3.8.10)
- `graphql`: GraphQL implementation
- `vite`: Build tool and dev server

## Tech Stack

**Backend:**
- Node.js
- Express.js v4
- Apollo Server v3
- GraphQL

**Frontend:**
- React 18
- Apollo Client 3.8
- Vite 7
- CSS3

## Features

- ✅ GraphQL server with queries and mutations
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ React client with Apollo Client integration
- ✅ Real-time data fetching with useQuery hook
- ✅ Styled UI components
- ✅ GraphQL Playground for testing
- ✅ Modular code structure
