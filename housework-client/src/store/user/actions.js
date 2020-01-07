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
      window.sessionStorage.setItem('token', response.data.token);
      dispatch({ type: USER_REQUEST_LOGIN_SUCCESS, token: response.data.token });
    } catch (exceptation) {
      dispatch({ type: USER_REQUEST_LOGIN_ERROR, error: exceptation.response.data.message });
    }
  };
};

export const register = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_REGISTER });
    try {
      const response = await api.register(login, password);
      window.sessionStorage.setItem('token', response.data.token);
      dispatch({ type: USER_REQUEST_REGISTER_SUCCESS, token: response.data.token });
    } catch (exceptation) {
      dispatch({ type: USER_REQUEST_REGISTER_ERROR, error: exceptation.response.data.message });
    }
  };
};
