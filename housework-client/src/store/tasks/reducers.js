import {
  TASKS_ADD_INIT,
  TASKS_ADD
} from './actions';

const initState = {
};

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
    default: {
      return state;
    }
  }
};

export default reducer;
