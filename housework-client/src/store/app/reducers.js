import {
  APP_NEW_TASK_SET_OPEN
} from './actions';

const initState = {
  newTaskOpen: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case APP_NEW_TASK_SET_OPEN: {
      return {
        ...state,
        newTaskOpen: action.open
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
