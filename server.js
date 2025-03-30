// server.js
import express from 'express';
import http from 'http';
import fs from 'fs';
import { connectMqtt, getDevicesData } from './mqtt_client.js';
import { setupSocketServer } from './socket_server.js';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
// Set up the Express app
const app = express();
const server = http.createServer(app);

// Serve static files (index.html, client.js) from the 'public' folder
app.use(express.static('public'));

// Set up Socket.IO server and get broadcast function
const { io, broadcastDeviceUpdate } = setupSocketServer(
  server,
  getDevicesData(),
);

// Connect MQTT and pass in socket emitter
connectMqtt(broadcastDeviceUpdate);

server.listen(config.serverPort, () => {
  console.log(`🚀 Server running on port ${config.serverPort}`);
});
