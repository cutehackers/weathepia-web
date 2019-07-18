import { combineReducers } from 'redux';

import alert from './alert.reducer';
import user from './users.reducer';
import authorization from './authorization.reducer';
import weather from './weather.reducer';

export default combineReducers({
  alert,
  user,
  authorization,
  weather
});
