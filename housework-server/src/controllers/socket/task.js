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
      const allTask = await Task.find().populate('user', ['_id', 'name']);
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
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    if (!validTaskPosition(payload.position)) {
      return terminateResponse;
    }
    try {
      const selectedTask = await Task.findById(payload.id);
      if ((selectedTask._id.equals(payload.id)) || (selectedTask.position === 'TODO')) {
        selectedTask.position = payload.position;
        if (payload.position !== 'TODO') {
          selectedTask.user = authResponse.message;
        } else {
          delete selectedTask.user;
        }
        try {
          await selectedTask.save();
          try {
            const updatedTask = await Task.findById(payload.id).populate('user', ['_id', 'name']);
            return {
              response: JSON.stringify({
                type: 'task_move',
                payload: {
                  task: updatedTask
                }
              }),
              broadcast: JSON.stringify({
                type: 'task_move',
                payload: {
                  task: updatedTask
                }
              })
            };
          } catch (e) {
            return terminateResponse;
          }
        } catch (e) {
          return terminateResponse;
        }
      } else {
        return terminateResponse;
      }
    } catch (e) {
      return terminateResponse;
    }
  },
  delete: async (payload) => {
    const authResponse = await authByPayload(payload);
    if (authResponse.auth === false) {
      return terminateResponse;
    }
    try {
      const deletedTask = await Task.deleteOne({ _id: payload.id });
      if (deletedTask.deletedCount !== 0) {
        return {
          response: JSON.stringify({
            type: 'task_delete',
            payload: {
              id: payload.id
            }
          })
        };
      }
      return terminateResponse;
    } catch (e) {
      return terminateResponse;
    }
  }
};
