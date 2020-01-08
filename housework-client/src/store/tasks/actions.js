export const TASK_ADD_ALL = 'TASK_ADD_ALL';

// export const setInitialTasks = (tasks) => {
//   console.log(tasks);
//   return async (dispatch) => {
//     dispatch({ type: 'TASK_ADD_ALL', tasks: tasks });
//   };
// };

export const setInitialTasks = (tasks) => {
  return async (dispatch) => {
    dispatch({ type: TASK_ADD_ALL, tasks: tasks });
  };
};
