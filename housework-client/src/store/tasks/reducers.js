import {
  TASKS_ADD_INIT,
  TASKS_ADD,
  TASKS_MOVE,
  TASKS_DELETE
} from './actions';

const initState = {
  tasks: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TASKS_ADD_INIT: {
      return {
        tasks: [
          ...action.tasks
        ]
      };
    }
    case TASKS_ADD: {
      return {
        tasks: [
          ...state.tasks,
          { ...action.task }
        ]
      };
    }
    case TASKS_MOVE: {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) {
            return {
              ...task,
              position: action.task.position
            };
          }
          return task;
        })
      };
    }
    case TASKS_DELETE: {
      return {
        tasks: state.tasks.filter((task) => {
          if (task.id === action.task.id) {
            return false;
          }
          return true;
        })
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
