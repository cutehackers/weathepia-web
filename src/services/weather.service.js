import weatherApi from './weather.api.js';
import { weatherApiKey } from '../config';

export const weatherService = {
  getForecastByCityName,
  getCurrentForecastByCityName,
  getHourlyForecast,
  getDailyForecast
};

function getForecastByCityName(city) {
  return Promise.all([getHourlyForecast(city), getDailyForecast(city)])
    .then(values => {
      return {
        hourly: values[0].data,
        daily: values[1].data
      }
    })
}

/**
 * https://www.weatherbit.io/api/weather-current
 * units(optional)
 *  M - [DEFAULT] Metric (Celcius, m/s, mm)
 *  S - Scientific (Kelvin, m/s, mm)
 *  I - Fahrenheit (F, mph, in)
 * @param {string} city 
 */
function getCurrentForecastByCityName(city) {
  return weatherApi.get(`/v2.0/current?key=${weatherApiKey}&city=${city}`);
}

/**
 * https://www.weatherbit.io/api/weather-forecast-120-hour
 * @param {string} city 
 */
function getHourlyForecast(city) {
  return weatherApi.get(`/v2.0/forecast/hourly?key=${weatherApiKey}&city=${city}&hours=6`);
}

/**
 * https://www.weatherbit.io/api/weather-forecast-16-day
 * @param {string} city 
 */
function getDailyForecast(city) {
  return weatherApi.get(`/v2.0/forecast/daily?key=${weatherApiKey}&city=${city}&days=6`)
}