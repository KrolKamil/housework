import api from '../../api';

export const TASK_REQUEST_PING = 'TASK_REQUEST_PING';

export const ping = (login, password) => {
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
