import { userActionTypes } from '../types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { 
  isLoginRequesting: false, 
  isAuthenticated: user ? true : false,
  user: user.data 
} : {};

export default function authorization(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.ACTION_USER_LOGIN_REQUEST:
      return {
        isLoginRequesting: true,
        isAuthenticated: false,
        user: action.user
      };

    case userActionTypes.ACTION_USER_LOGIN_SUCCESS:
      return {
        isLoginRequesting: false,
        isAuthenticated: true,
        user: action.user
      };

    case userActionTypes.ACTION_USER_LOGIN_FAILURE:
      return {
        isLoginRequesting: false
      };

    case userActionTypes.ACTION_USER_LOGOUT:
      return {
        isLoginRequesting: false,
        isAuthenticated: false
      };

    default:
      return state;
  }
}
