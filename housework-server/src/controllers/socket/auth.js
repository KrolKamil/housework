import jwt from 'jsonwebtoken';
import { User } from '../../models/user.js';

const authErrorMessage = (message) => {
  return JSON.stringify({
    type: 'auth_error',
    message: message
  });
};

const auth = async (payload) => {
  if (payload.hasOwnProperty('token')) {
    try {
      const decoded = jwt.verify(payload.token, process.env.PRIVATE_KEY);
      try {
        const userExists = await User.findOne({ id: decoded.id });
        if (userExists) {
          return authErrorMessage('user do not exists - reset your hash');
        } else {
          return JSON.stringify({
            type: 'auth_success'
          });
        }
      } catch (e) {
        return authErrorMessage('internal database error');
      }
    } catch (e) {
      return authErrorMessage('invalid hash');
    }
  } else {
    return authErrorMessage('hash key not found');
  }
};

exports.auth = auth;
