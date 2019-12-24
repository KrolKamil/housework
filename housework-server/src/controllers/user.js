const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, validateUser, userAuthErrorObject } = require('../models/user');

module.exports = {
  register: async (req, res) => {
    try {
      await validateUser(req.body);
    } catch (error) {
      return res.status(400).json(userAuthErrorObject(error.details[0].message));
    }
    const hashedPassword = bcrypt.hashSync(req.body.password);
    User.findOne({ name: req.body.name }, (error, user) => {
      if (error) {
        return res.status(500).json(userAuthErrorObject('unknown error'));
      }
      if (!user) {
        return res.status(409).json(userAuthErrorObject('user already exists'));
      }
    });
    User.create({
      name: req.body.name,
      password: hashedPassword
    }, (error, user) => {
      if (error) {
        return res.status(400).json(userAuthErrorObject(error));
      }
      const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: 86400
      });
      res.status(200).json({ auth: true, token: token });
    });
  },
  login: async (req, res) => {
    User.findOne({ name: req.body.name }, (error, user) => {
      if (error) {
        return res.status(500).json(userAuthErrorObject('unknown error'));
      }
      if (!user) {
        return res.status(404).json(userAuthErrorObject('user not found'));
      }
      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json(userAuthErrorObject('wrong password'));
      }

      const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: 86400
      });
      res.status(200).json({ auth: true, token: token });
    });
  }
};
