import {
  TASKS_ADD_INIT,
  TASKS_ADD,
  TASKS_MOVE,
  TASKS_DELETE,
  TASKS_SET_EDIT_VISIBILITY,
  TASKS_SET_NEW_VISIBILITY,
  TASKS_SET_EDIT_ID
} from './actions';

const initState = {
  tasks: [],
  editVisible: false,
  newVisible: false,
  editId: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TASKS_SET_EDIT_ID: {
      return {
        ...state,
        editId: action.id
      };
    }
    case TASKS_SET_NEW_VISIBILITY: {
      return {
        ...state,
        newVisible: action.value
      };
    }
    case TASKS_SET_EDIT_VISIBILITY: {
      return {
        ...state,
        editVisible: action.value
      };
    }
    case TASKS_ADD_INIT: {
      return {
        ...state,
        tasks: [
          ...action.tasks
        ]
      };
    }
    case TASKS_ADD: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { ...action.task }
        ]
      };
    }
    case TASKS_MOVE: {
      return {
        ...state,
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
        ...state,
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
