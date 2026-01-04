import { useQuery, gql } from '@apollo/client'
import './App.css'

// GraphQL Query
const GET_AUTHORS = gql`
  query GetAuthors {
    getAuthors {
      id
      info {
        name
        age
        gender
      }
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_AUTHORS)

  if (loading) return <p>Loading authors...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>GraphQL Apollo Client Demo</h1>
      <h2>Authors List</h2>
      
      <div className="authors-container">
        {data?.getAuthors?.map((author) => (
          <div key={author.id} className="author-card">
            <h3>{author.info.name}</h3>
            <p>Age: {author.info.age}</p>
            <p>Gender: {author.info.gender}</p>
            <p>ID: {author.id}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
