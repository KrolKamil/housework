import api from '../../api';

export const USER_REQUEST_LOGIN = 'USER_REQUEST_LOGIN';
export const USER_REQUEST_LOGIN_SUCCESS = 'USER_REQUEST_LOGIN_SUCCESS';
export const USER_REQUEST_LOGIN_ERROR = 'USER_REQUEST_LOGIN_ERROR';
export const USER_REQUEST_REGISTER = 'USER_REQUEST_REGISTER';
export const USER_REQUEST_REGISTER_SUCCESS = 'USER_REQUEST_REGISTER_SUCCESS';
export const USER_REQUEST_REGISTER_ERROR = 'USER_REQUEST_REGISTER_ERROR';

export const login = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_LOGIN });
    try {
      const response = await api.login(login, password);
      dispatch({ type: USER_REQUEST_LOGIN_SUCCESS, token: response });
    } catch (exceptation) {
      dispatch({ type: USER_REQUEST_LOGIN_ERROR, error: exceptation });
    }
  };
};

export const register = (login, password) => {
  return {
    type: USER_REQUEST_REGISTER,
    login: login,
    password: password
  };
};
