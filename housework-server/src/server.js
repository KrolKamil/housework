const http = require('http');
const db = require('./db');
const app = require('./app');
const socket = require('./socket');

const server = () => {
  db();
  const server = http.createServer(app());
  socket(server);
  server.listen(process.env.PORT || 3000, () => { console.log(`Server staretd at port: ${process.env.PORT}`); });
};

module.exports = server;
