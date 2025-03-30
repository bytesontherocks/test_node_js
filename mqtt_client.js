// mqttClient.js
import mqtt from 'mqtt';

import fs from 'fs';
//import config from './config.json' assert { type: 'json' };
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Store device data in-memory (can be replaced with DB later)
const devicesData = new Map();

let mqttClient;

export function connectMqtt(onMqttMessage) {
  mqttClient = mqtt.connect(config.mqttBroker);

  mqttClient.on('connect', () => {
    console.log(`🔗 Connected to MQTT broker at ${config.mqttBroker}`);

    mqttClient.subscribe(config.mqttTopic || '#', (err) => {
      if (err) {
        console.error('⚠️ Error subscribing to MQTT topics:', err);
      } else {
        console.log(`📡 Subscribed to topic: ${config.mqttTopic || '#'}`);
      }
    });
  });

  mqttClient.on('message', (topic, message) => {
    const msgStr = message.toString();
    const segments = topic.split('/');

    // Assumes topic format: /topicX/deviceId/value
    const deviceId = segments[1];
    const key = segments[0];

    if (!deviceId || !key) {
      console.log(
        `Mqtt message received does not comply with the expected format`,
      );
      return;
    }

    const value = msgStr;
    if (!devicesData.has(deviceId)) {
      devicesData.set(deviceId, {});
    }
    devicesData.get(deviceId)[key] = value;

    console.log(`📥 MQTT message: [${topic}] => ${value}`);

    // Forward to connected web clients via socket
    if (typeof onMqttMessage === 'function') {
      onMqttMessage(deviceId, key, value);
    }
  });
}

export function getDevicesData() {
  // Convert Map to plain object for easier handling
  const result = {};
  for (const [deviceId, data] of devicesData.entries()) {
    result[deviceId] = data;
  }
  return result;
}
