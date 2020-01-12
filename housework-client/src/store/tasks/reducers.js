import {
  TASKS_ADD_INIT,
  TASKS_ADD,
  TASKS_MOVE,
  TASKS_DELETE
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
            position: action.task.position
          };
        }
        return task;
      });
    }
    case TASKS_DELETE: {
      return state.filter((task) => {
        if (task.id === action.task.id) {
          return false;
        }
        return true;
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
