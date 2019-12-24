const express = require('express');
const bodyParser = require('body-parser');
const user = require('./controllers/app/user');

const app = () => {
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
  app.get('/', (req, res) => { res.send('Hello World'); });
  app.post('/user/login', user.login);
  app.post('/user/register', user.register);
  return app;
};

module.exports = app;
