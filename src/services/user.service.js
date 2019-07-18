import api from './api.js';
import qs from 'qs';

export const userService = {
  signUp,
  login,
  logout
};

/**
 * Create a new account
 * endpoint: /users
 * method: POST
 * data: {
 *   type: 0,
 *   firstName: '',
 *   lastName: '',
 *   email: '',
 *   password: ''
 * }
 *
 * user type
 * 0: normal
 * 1: admin
 */
function signUp(data) {
  return api.post('/users', qs.stringify(data));
}

/**
 * Authenticate user with email and password
 * @param {
 *  grant_typ: "password",
 *  username: "crazy1@gmail.com",
 *  password: "1234"
 * } data
 * 
 * TODO This function can be extended to a seperate authorization service some day later
 */
function login(email, password) {
  const request = {
    grant_type: 'password',
    username: email,
    password: password
  };

  return api.post('/oauth/token', qs.stringify(request))
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    });
}

/**
 * remove user from local storage to log user out
 */
function logout() {
  localStorage.removeItem('user');
}
