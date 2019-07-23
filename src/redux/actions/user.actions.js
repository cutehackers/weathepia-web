import { userActionTypes } from '../types';
import { userService } from '../../services';
import { alertSuccess, alertError } from './';
import { appActionTypes } from '../types/app.types';

export function signUp(user, history) {
  return dispatch => {
    dispatch(request(user));

    userService
      .signUp(user)
      .then(response => {
        dispatch(success(response));
        history.push('/login');
        dispatch(alertSuccess('Sign-up successful'));
      })
      .catch(error => {
        // const { statusCode, message }
        const { message } = error.response.data;

        // switch (statusCode) {
        //   case 409:
        //     // 409: user already exists
        //     console.error(`singup error> ${message}`);
        //     break;

        //   default:
        //     console.error(`singup error> unexpected`);
        // }

        dispatch(failure(message));
        dispatch(alertError(message));
      });
  };

  function request(user) {
    return {
      type: userActionTypes.ACTION_USER_SIGNUP_REQUEST,
      user
    };
  }

  function success(user) {
    return {
      type: userActionTypes.ACTION_USER_SIGNUP_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: userActionTypes.ACTION_USER_SIGNUP_FAILURE,
      error
    };
  }
}

export function login(email, password, history) {
  return dispatch => {
    dispatch(request(email));
    
    userService
      .login(email, password)
      .then(response => {
        dispatch(success(response.data));
        history.push('/');
      })
      .catch(error => {
        const { message } = error.response.data;

        dispatch(failure(message));
        dispatch(alertError(message));
      });
  };

  function request(user) {
    return { type: userActionTypes.ACTION_USER_LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: userActionTypes.ACTION_USER_LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: userActionTypes.ACTION_USER_LOGIN_FAILURE, error };
  }
}

export function logout(history) {
  return dispatch => {
    userService.logout();

    dispatch(request());
    dispatch(resetApp());
    
    if (history) {
      history.push('/login');
    }
  }

  function request() {
    return { type: userActionTypes.ACTION_USER_LOGOUT };
  }

  function resetApp() {
    return { type: appActionTypes.ACTION_APP_RESET_REQUEST };
  }
}

export function withdrawal() {}
