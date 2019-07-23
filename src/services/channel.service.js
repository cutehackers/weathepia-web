import api from './api.js';
import qs from 'qs';

export const channelService = {
  createWeatherChannel,
  getWeatherChnnelsByUserId,
  deleteWeatherChannelById
};

/**
 * Create a new weather channel for a user
 * @param {
 *  uid: number
 *  city: string
 * } data 
 */
function createWeatherChannel(data) {
  return api.post('weather/channels', qs.stringify(data));
}

/**
 * Get a list of weather channel by user
 * @param {number} userId 
 */
function getWeatherChnnelsByUserId(userId) {
  return api.get(`weather/channels/user/${userId}`);
}

/**
 * Delete a weather channel by weather channel id
 * @param {number} id 
 */
function deleteWeatherChannelById(id) {
  return api.delete(`weather/channels/${id}`);
}