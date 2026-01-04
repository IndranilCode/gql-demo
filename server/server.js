const express = require('express');

const PORT = 3500;

const app = express();

app.use('/graphql', (req, res) => {
  res.send('GraphQL endpoint 2');
});

app.get('/', (req, res) => {
  res.send('Hello, World!!');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});