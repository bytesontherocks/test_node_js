// socketServer.js
import { Server } from 'socket.io';

export function setupSocketServer(httpServer, initialDeviceData) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Adjust for production
    },
  });

  const clients = new Map(); // If you want to track custom info per socket

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Optionally store socket or metadata
    clients.set(socket.id, socket);

    // Send initial data for all devices
    socket.emit('device data', initialDeviceData);

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      clients.delete(socket.id);
    });
  });

  /**
   * This function can be called by your MQTT handler
   * to forward updates to all connected clients
   */
  function broadcastDeviceUpdate(deviceId, topic, value) {
    io.emit('device update', {
      deviceId,
      topic,
      value,
    });
  }

  return {
    io,
    broadcastDeviceUpdate,
  };
}
