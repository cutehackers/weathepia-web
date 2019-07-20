import { weatherActionTypes } from '../types';

const initialState = {
  isWeatherRequesting: false,
  forecast: {}
};

export default function weather(state = initialState, action) {
  switch (action.type) {
    case weatherActionTypes.ACTION_WEATHER_REQUEST:
      return {
        isWeatherRequesting: true
      };

    case weatherActionTypes.ACTION_WEATHER_SUCCESS:
      return {
        isWeatherRequesting: false,
        forecast: action.forecast
      };

    case weatherActionTypes.ACTION_WEATHER_EMPTY:
      return {
        isWeatherRequesting: false,
        forecast: {}
      };
      
    case weatherActionTypes.ACTION_WEATHER_FAILURE:
      return {
        isWeatherRequesting: false,
        forecast: {}
      };

    default:
      return state;
  }
}
