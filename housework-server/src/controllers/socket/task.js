const { authByPayload } = require('../../utils');
const { Task, validateTask } = require('../../models/task');

const terminateResponse = {
  terminate: true
};

module.exports = {
  getAll: async (payload) => {

  },
  add: async (payload) => {
    console.log(payload);
    const authResponse = await authByPayload(payload);
    console.log(authResponse);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      await validateTask(payload);
    } catch (e) {
      return terminateResponse;
    }
    const myRes = await Task.create({
      title: payload.title,
      description: payload.description || '',
      position: 'TODO'
    });
    console.log(myRes);
  }
};
