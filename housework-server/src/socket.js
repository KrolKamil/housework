const WebSocket = require('ws');

const socket = (server) => {
  const wss = new WebSocket.Server({ server });

  // const keepAlive = () => {
  //   this.isAlive = true;
  //   this.pong();
  // };

  wss.on('connection', (ws) => {
    ws.addEventListener('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        const response = handleMessage(parsedMessage);
        ws.send(response);
      } catch (error) {
        const errorMessage = {
          type: 'error',
          payload: {
            message: 'json parse error'
          }
        };
        const stingifiedMessage = JSON.stringify(errorMessage);
        ws.send(stingifiedMessage);
      }
    });
  });

  const handleMessage = (message) => {
    switch (message.type) {
      case 'auth':
    }
  };

  // const terminateInterval = setInterval(() => {
  //   wss.clients.forEach((ws) => {
  //     if (!ws.isAlive) {
  //       return ws.terminate();
  //     }
  //     ws.isAlive = false;
  //   });
  // }, 15000);
};

module.exports = socket;
