# GraphQL Demo

A GraphQL server demo project built with Apollo Server and Express.js.

## Project Structure

```
gql-demo/
└── server/          # GraphQL server implementation
    ├── server.js    # Basic server setup
    ├── server2.js   # Extended server with queries
    ├── package.json
    └── README.md    # Server-specific documentation
```

## Getting Started

### Installation

```bash
cd server
npm install
```

### Usage

**Development Mode (with auto-restart)**
```bash
npm run dev
```

**Production Mode**
```bash
npm start
```

The server will start on `http://localhost:3501/graphql`

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

## Dependencies

- `express`: Web server framework
- `apollo-server-express`: GraphQL server
- `graphql`: GraphQL implementation
- `core-js`: Polyfills
- `nodemon`: Auto-restart tool (dev dependency)

## Tech Stack

- Node.js
- Express.js v4
- Apollo Server v3
- GraphQL
