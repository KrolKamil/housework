import jwt from 'jsonwebtoken';

export const getTokenFromStorage = () => {
  try {
    return window.sessionStorage.getItem('token');
  } catch (e) {
    return null;
  }
};

export const getTrokenFromStorageAndTransformToId = () => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token === null) {
      return null;
    }
    const decodedToken = jwt.decode(token);
    return decodedToken.id;
  } catch (e) {
    return null;
  }
};
