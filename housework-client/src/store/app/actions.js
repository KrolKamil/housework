export const APP_NEW_TASK_SET_OPEN = 'APP_NEW_TASK_SET_OPEN';
export const APP_EDIT_TASK_SET_OPEN = 'APP_EDIT_TASK_SET_OPEN';
export const APP_SET_TASK_TO_EDIT = 'APP_SET_TASK_TO_EDIT';

export const setNewTaskOpen = (value) => {
  return async (dispatch) => {
    dispatch({ type: APP_NEW_TASK_SET_OPEN, open: value });
  };
};

export const setEditTaskOpen = (value) => {
  return async (dispatch) => {
    dispatch({ type: APP_EDIT_TASK_SET_OPEN, open: value });
  };
};

export const setTaskToEdit = (task) => {
  return async (dispatch) => {
    dispatch({ type: APP_SET_TASK_TO_EDIT, open: task });
  };
};
