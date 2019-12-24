const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const user = require('./controllers/user');

const server = () => {
  mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0-v1776.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const app = express();
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    console.log(req.body);
    next();
  });
  app.use((error, req, res, next) => {
    res.status(400).json({
      type: 'error',
      message: error.type || 'unknown error'
    });
  });
  const server = http.createServer(app);
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

  app.get('/', (req, res) => { res.send('Hello World'); });
  app.post('/user/login', user.login);
  app.post('/user/register', user.register);
  server.listen(process.env.PORT, () => { console.log(`Server staretd at port: ${process.env.PORT}`); });
};

module.exports = server;
