export const getTokenFromStorage = () => {
  try {
    return window.sessionStorage.getItem('token');
  } catch (e) {
    return null;
  }
};
