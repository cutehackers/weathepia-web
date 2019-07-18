import { alertActionTypes } from '../types';

export default function alert(state = {}, action) {
  switch (action.type) {
    case alertActionTypes.ACTION_ALERT_SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };

    case alertActionTypes.ACTION_ALERT_ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };

    case alertActionTypes.ACTION_ALERT_CLEAR:
      return {};
    
    default: 
      return state;
  }
}
