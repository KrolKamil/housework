import { getTokenFromStorage } from '../../utils/utils';

import {
  USER_REQUEST_LOGIN,
  USER_REQUEST_LOGIN_SUCCESS,
  USER_REQUEST_LOGIN_ERROR,
  USER_REQUEST_REGISTER,
  USER_REQUEST_REGISTER_SUCCESS,
  USER_REQUEST_REGISTER_ERROR
} from './actions';

const initState = {
  token: getTokenFromStorage(),
  loginError: null,
  isLogging: false,
  isRegistering: false,
  registeringError: null
};

const reducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case USER_REQUEST_LOGIN: {
      return {
        ...state,
        isLogging: true
      };
    }
    case USER_REQUEST_LOGIN_SUCCESS: {
      return {
        ...state,
        isLogging: false,
        token: action.token
      };
    }
    case USER_REQUEST_LOGIN_ERROR: {
      return {
        ...state,
        isLogging: false,
        loginError: action.error
      };
    }
    case USER_REQUEST_REGISTER: {
      return {
        ...state,
        isRegistering: true
      };
    }
    case USER_REQUEST_REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistering: false,
        token: action.token
      };
    }
    case USER_REQUEST_REGISTER_ERROR: {
      return {
        ...state,
        isRegistering: false,
        registeringError: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
