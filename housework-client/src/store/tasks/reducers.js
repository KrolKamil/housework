import {
  TASKS_ADD_INIT,
  TASKS_ADD,
  TASKS_MOVE
} from './actions';

const initState = [];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TASKS_ADD_INIT: {
      return [
        ...action.tasks
      ];
    }
    case TASKS_ADD: {
      return [
        ...state,
        { ...action.task }
      ];
    }
    case TASKS_MOVE: {
      return state.map((task) => {
        if (task.id === action.task.id) {
          return {
            ...task,
            id: action.task.id
          };
        }
        return task;
      });
      // console.log(action.task);
      // return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
