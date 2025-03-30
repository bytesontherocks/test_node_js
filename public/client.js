// client.js

// Connect to the Socket.IO server
const socket = io();

// This function will update or create a table for a given device
function updateDeviceTable(deviceId, topic, value) {
  let deviceTable = document.getElementById(deviceId);

  // Create the table for the device if it doesn't exist
  if (!deviceTable) {
    deviceTable = document.createElement('table');
    deviceTable.id = deviceId;
    deviceTable.classList.add('device-table');

    // Add a header row with device name
    const headerRow = document.createElement('tr');
    const headerCell = document.createElement('th');
    headerCell.colSpan = 2;
    headerCell.textContent = `Device: ${deviceId}`;
    headerRow.appendChild(headerCell);
    deviceTable.appendChild(headerRow);

    // Append the table to the page
    document.getElementById('device-tables').appendChild(deviceTable);
  }

  // Add a new row with the topic and value for the device
  const newRow = document.createElement('tr');
  const topicCell = document.createElement('td');
  const valueCell = document.createElement('td');

  topicCell.textContent = topic;
  valueCell.textContent = value;

  newRow.appendChild(topicCell);
  newRow.appendChild(valueCell);

  deviceTable.appendChild(newRow);
}

// Listen for device updates from the server via Socket.IO
socket.on('device update', (data) => {
  const { deviceId, topic, value } = data;
  updateDeviceTable(deviceId, topic, value);
});
