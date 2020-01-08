import { TASK_ADD_ALL } from './actions';

const initState = {
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TASK_ADD_ALL: {
      return {
        ...state,
        ...action.tasks
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
