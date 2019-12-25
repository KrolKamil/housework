const WebSocket = require('ws');
const { auth } = require('./controllers/socket/auth');
const task = require('./controllers/socket/task');

const socket = (server) => {
  const wss = new WebSocket.Server({ server });

  // const keepAlive = () => {
  //   this.isAlive = true;
  //   this.pong();
  // };

  wss.on('connection', (ws) => {
    ws.addEventListener('message', async (message) => {
      try {
        const parsedMessage = await JSON.parse(message.data);
        const response = await handleMessage(parsedMessage);
        if (response.response) {
          ws.send(response.response);
        }
        if (response.broadcast) {
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(response.broadcast);
            }
          });
        }
        if (response.terminate === true) {
          ws.terminate();
        }
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

  const handleMessage = async (message) => {
    if (message.hasOwnProperty('type') && message.hasOwnProperty('payload')) {
      switch (message.type) {
        case 'auth':
          return auth(message.payload);
        case 'task_add':
          return task.add(message.payload);
        case 'task_all':
          return task.all(message.payload);
        case 'task_move':
          return task.move(message.payload);
        case 'task_delete':
          return task.delete(message.payload);
        case 'task_edit':
          return task.edit(message.payload);
        default:
          return JSON.stringify({ type: 'type: unknown' });
      }
    }
    return JSON.stringify({ type: 'error', payload: { message: 'object property: type or payload not found' } });
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
