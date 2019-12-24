import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, validateUser } from '../models/user';

module.exports = {
  register: async (req, res) => {
    try {
      validateUser(req.body);
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

  }
};
