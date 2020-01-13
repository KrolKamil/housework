export const APP_NEW_TASK_SET_OPEN = 'APP_NEW_TASK_SET_OPEN';

export const setNewTaskOpen = (value) => {
  return async (dispatch) => {
    dispatch({ type: APP_NEW_TASK_SET_OPEN, open: value });
  };
};
