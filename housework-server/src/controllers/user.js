const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, validateUser } = require('../models/user');

module.exports = {
  register: async (req, res) => {
    console.log(req.body);
    try {
      await validateUser(req.body);
    } catch (error) {
      return res.status(400).send(error.details[0].message);
    }
    const hashedPassword = bcrypt.hashSync(req.body.password);

    User.create({
      name: req.body.name,
      password: hashedPassword
    }, (error, user) => {
      if (error) {
        return res.status(400).send(error);
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
        return res.status(500).send('eror');
      }
      if (!user) {
        return res.status(404).send('No user found.');
      }
      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ auth: false, token: null });
      }

      const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: 86400
      });
      res.status(200).json({ auth: true, token: token });
    });
  }
};
