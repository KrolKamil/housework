const { authByPayload } = require('../../utils');
const { Task, validateTask, validTaskPosition } = require('../../models/task');

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
  },
  move: async (payload) => {
    console.log(payload);
    const authResponse = await authByPayload(payload);
    console.log(authResponse);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    if (!validTaskPosition(payload.position)) {
      return terminateResponse;
    }
    try {
      console.log('before find');
      const selectedTask = await Task.findById(payload.id);
      console.log(selectedTask);
      console.log('start');
      console.log(selectedTask._id);
      console.log(payload.id);
      console.log(payload.id === selectedTask._id);
      console.log('end');
      if ((selectedTask._id.equals(payload.id)) || (selectedTask.position === 'TODO')) {
        console.log('setting position');
        selectedTask.position = payload.position;
        try {
          console.log('before save');
          await selectedTask.save();
          return {
            response: JSON.stringify({
              type: 'task_move',
              payload: {
                id: selectedTask._id
              }
            })
          };
        } catch (e) {
          return terminateResponse;
        }
      } else {
        console.log('terminating');
        return terminateResponse;
      }
    } catch (e) {
      return terminateResponse;
    }
  }
};
