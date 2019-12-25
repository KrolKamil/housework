const { authByPayload } = require('../../utils');
const { Task, validateTask } = require('../../models/task');

const terminateResponse = {
  terminate: true
};

module.exports = {
  all: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      const allTask = await Task.find();
      console.log(allTask);
      return {
        response: JSON.stringify({
          type: 'task_all',
          payload: allTask
        })
      };
    } catch (e) {
      return terminateResponse;
    }
  },
  add: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      await validateTask(payload);
    } catch (e) {
      return terminateResponse;
    }
    try {
      const savedTask = await Task.create({
        title: payload.title,
        description: payload.description || '',
        position: 'TODO',
        timestamp: payload.timestamp
      });
      return {
        response: JSON.stringify({
          type: 'task_add',
          payload: {
            timestamp: savedTask.timestamp
          }
        }),
        broadcast: JSON.stringify({
          type: 'task_new',
          payload: savedTask
        }) };
    } catch (e) {
      return terminateResponse;
    }
  }
};
