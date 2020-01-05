import { combineReducers } from 'redux';
import userReducer from './user/reducers';

const reducer = combineReducers({
  user: userReducer
});

export default reducer;
