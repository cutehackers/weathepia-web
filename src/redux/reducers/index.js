import { combineReducers } from 'redux';

import { appActionTypes } from '../types/app.types';

import alert from './alert.reducer';
import user from './users.reducer';
import authorization from './authorization.reducer';
import weather from './weather.reducer';
import facebook from './facebook.reducer';
import channel from './channel.reducer';

const appReducer = combineReducers({
  alert,
  user,
  authorization,
  weather,
  facebook,
  channel
});

const rootReducer = (state, action) => {
  if (action.type === appActionTypes.ACTION_APP_RESET_REQUEST) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;
