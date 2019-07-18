// http url format
// scheme://user@host:port/path?query#fragment

module.exports = {
  envType: process.env.NODE_ENV,
  port: process.env.REACT_APP_PORT,
  apiUrl: process.env.REACT_APP_API_URL,
  apiUrlCreate: (path) => {
    return this.apiUrl.concat(path);
  },
  weatherApiKey: process.env.REACT_APP_WEATHER_API_KEY,
  weatherApiUrl: process.env.REACT_APP_WEATHER_API_URL,
  weatherApiUrlCreate: (path) => {
    return this.weatherApiUrl.concat(path);
  }
};
