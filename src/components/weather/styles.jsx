const { topbar } = require('../../assets/dimens');

// WeatherForecast styles
export default theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    height: `calc(100vh - ${topbar.height})`,
    marginTop: 'auto',
  },
  emptyWeatherView: {
    margin: 'auto',
    alignItems: 'center',
  }
});
