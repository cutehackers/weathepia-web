import { alertActionTypes } from '../types';

export const alertSuccess = message => {
  return {
    type: alertActionTypes.ACTION_ALERT_SUCCESS,
    message
  };
};

export const alertError = message => {
  return {
    type: alertActionTypes.ACTION_ALERT_ERROR,
    message
  };
};

export const alertClear = message => {
  return {
    type: alertActionTypes.ACTION_ALERT_CLEAR,
    message
  };
};
