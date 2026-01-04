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

**Option 5: Using @skip directive to conditionally exclude fields**
```graphql
query($authorId1: ID!, $authorId2: ID!, $skipGender: Boolean!) {
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
      gender @skip(if: $skipGender)
    }
  }
}
```

Variables (add in the GraphQL Playground):
```json
{
  "authorId1": "2",
  "authorId2": "3",
  "skipGender": true
}
```

Set `skipGender` to `true` to exclude the gender field, or `false` to include it.

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
