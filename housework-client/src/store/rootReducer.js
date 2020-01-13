import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import tasksReducer from './tasks/reducers';
import appReducer from './app/reducers';

const reducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  app: appReducer
});

export default reducer;
