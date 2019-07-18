import { weatherActionTypes } from '../types/weather.types';
import { weatherService } from '../../services/weather.service';

const alertError = require('./alert.actions');

export function getForecastByCityName(city) {
  return dispatch => {
    dispatch(request(city));

    if (!city || city.length === 0) {
      dispatch(empty());
      return;
    }

    weatherService.getForecastByCityName(city)
      .then(response => {
        // response.hourly.data.forEach(data => {
        //   let dt = new Date(data.ts * 1000);
        //   console.log(`darby> hourly: ${dt.toLocaleString()}`);
        // });

        // response.daily.data.forEach(data => {
        //   let dt = new Date(data.ts * 1000);
        //   console.log(`darby> daily: ${dt.toLocaleString()}`);
        // });

        dispatch(success(response));
      })
      .catch(error => {
        const { message } = error.response.data;

        dispatch(failure(message));
        dispatch(alertError(message));
      });
  }

  function request(city) {
    return {
      type: weatherActionTypes.ACTION_WEATHER_REQUEST,
      city
    };
  }

  function success(forecast) {
    return {
      type: weatherActionTypes.ACTION_WEATHER_SUCCESS,
      forecast
    }
  }

  function empty() {
    return {
      type: weatherActionTypes.ACTION_WEATHER_EMPTY
    }
  }

  function failure(error) {
    return {
      type: weatherActionTypes.ACTION_WEATHER_FAILURE,
      error
    }
  }
}