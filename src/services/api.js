import axios from 'axios';

const { apiUrl } = require('../config.js');

/**
 * Set up api server configurations
 * 
 * axios.defaults.baseURL = apiUrl;
 * axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
 * axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 */
export default axios.create({
  baseURL: apiUrl
});