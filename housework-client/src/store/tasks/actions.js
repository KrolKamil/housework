export const TASKS_ADD_INIT = 'TASKS_ADD_INIT';
export const TASKS_ADD = 'TASKS_ADD';
export const TASKS_MOVE = 'TASKS_MOVE';

export const setInitialTasks = (tasks) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_ADD_INIT, tasks: tasks });
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: TASKS_ADD, task: task });
  };
};

export const moveTask = (task) => {
  return async (dispatch) => {
    console.log('inc');
    console.log(task);
    dispatch({ type: TASKS_MOVE, task: task });
  };
};
