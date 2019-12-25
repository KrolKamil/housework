const { authByPayload } = require('../../utils');

const authErrorMessage = (message) => {
  return JSON.stringify({
    type: 'auth_error',
    message: message
  });
};

const auth = async (payload) => {
  const authResponse = await authByPayload(payload);
  if (authResponse.auth === true) {
    return JSON.stringify({
      type: 'auth_success'
    });
  }
  return authErrorMessage(authResponse.message);
};

exports.auth = auth;
