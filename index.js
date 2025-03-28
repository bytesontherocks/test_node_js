// index.js
import http from 'http';

const server = http.createServer((req, res) => {
  res.end('Hello from Node.js!');
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
