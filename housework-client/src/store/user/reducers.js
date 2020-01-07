import {
  USER_REQUEST_LOGIN,
  USER_REQUEST_LOGIN_SUCCESS,
  USER_REQUEST_LOGIN_ERROR,
  USER_REQUEST_REGISTER,
  USER_REQUEST_REGISTER_SUCCESS,
  USER_REQUEST_REGISTER_ERROR
} from './actions';

const initState = {
  token: null,
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
    default: {
      return state;
    }
  }
};

export default reducer;
