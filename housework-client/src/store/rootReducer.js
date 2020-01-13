import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import tasksReducer from './tasks/reducers';

const reducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer
});

export default reducer;
