const WebSocket = require('ws');

const socket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    ws.addEventListener('message', (message) => {
      console.log(message.data);
    });
    ws.on('open', () => {
      console.log('peer connected');
      ws.send('Hello From Server');
    });
  });
};

module.exports = socket;
