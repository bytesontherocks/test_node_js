import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  // broadcast
  io.emit(
    'broadcast message',
    'Benvingut al xat - un nou client sha connectat',
  );

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // socket specific
    socket.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
